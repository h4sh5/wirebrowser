import { useState, useEffect, useRef } from "react";
import RequestEditor from "@/components/request-editor";
import { useApiEvent } from "@/hooks/useEvents";
import { Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Request, Response } from "@/../common/models";


const RequestCreator = ({ request, onChange }) => {
  const [currentRequest, setCurrentRequest] = useState(null);
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const [historyPrevEnabled, setHistoryPrevEnabled] = useState(false);
  const [historyNextEnabled, setHistoryNextEnabled] = useState(false);
  const [actionsEnabled, setActionsEnabled] = useState(true);
  const requestHistory = useRef([request]);
  useEffect(() => {
    setCurrentRequest(request);
  }, [request]);

  useEffect(() => {
    setHistoryPrevEnabled(currentRequestIndex > 0);
    setHistoryNextEnabled(currentRequestIndex < requestHistory.current.length - 1);
  }, [currentRequestIndex]);

  const { dispatchApiEvent } = useApiEvent({
    "network.sendRequestDone": (response) => {
      setActionsEnabled(true);
      if(!response){
        return;
      }
      setCurrentRequest(cur => {
        const next = new Request(cur);
        next.response = new Response(response);
        requestHistory.current[currentRequestIndex] = next;
        return next;
      });
    }
  });

  const sendRequest = (req) => {
    setActionsEnabled(false);
    if (!req.compare(currentRequest)) {
      setCurrentRequest(req);
      setCurrentRequestIndex(requestHistory.current.length);
      // setRequestHistory(cur => [...cur, req]);
      requestHistory.current.push(req);
    }

    dispatchApiEvent("network.sendRequest", req);
  }

  const historyPrev = () => {
    setCurrentRequest(requestHistory.current[currentRequestIndex - 1]);
    setCurrentRequestIndex(cur => cur - 1);
  }

  const historyNext = () => {
    setCurrentRequest(requestHistory.current[currentRequestIndex + 1]);
    setCurrentRequestIndex(cur => cur + 1);
  }

  return (
    <>
      <div>
        <Button
          type="text"
          disabled={!historyPrevEnabled}
          onClick={historyPrev}
          icon={<ArrowLeftOutlined />}
        />
        <Button
          type="text"
          disabled={!historyNextEnabled}
          onClick={historyNext}
          icon={<ArrowRightOutlined />}
        />
      </div>
      <RequestEditor
        request={currentRequest}
        requestActionsEnabled={actionsEnabled}
        onChange={onChange}
        // responseActionsEnabled={responseActionsEnabled}
        requestActions={{
          position: "end",
          buttons: [
            { label: "Send", type: "primary", onClick: req => sendRequest(req) },
          ]
        }}
      />
    </>
  )

}

export default RequestCreator;