import { useState, useEffect, useRef } from "react";
import { Button, Input, Form } from "antd";
import { useApiEvent } from "@/hooks/useEvents";
import { Panel, PanelGroup, PanelResizeHandle } from "@/components/panels";
import CodeEditor from "@/components/code-editor";
import PageSelector from "@/components/page-selector";
import DynamicTabs from "@/components/dynamic-tabs";
import SearchClassesHelpTab from "@/modules/memory/help-tabs/search-classes";
import { useHelpTab } from "@/hooks/useHelpTab";
import { InfoCircleOutlined } from "@ant-design/icons";


const SearchClassesTab = ({ onAddHelpTab }) => {
  const [isLoading, setIsLoding] = useState(false);
  const [resultValue, setResultValue] = useState("");
  const [form] = Form.useForm();

  const { dispatchApiEvent } = useApiEvent({
    "heap.searchClassesResult": (data) => {
      setResultValue(JSON.stringify(data, null, 2));
      setIsLoding(false);
    }
  });

  const onFinish = (values) => {
    setIsLoding(true);
    dispatchApiEvent("heap.searchClasses", {
      pageId: values.pageId,
      proto: values.proto,
    })
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={10}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label="Page" name="pageId">
              <PageSelector multiple={false} />
            </Form.Item>
            <Form.Item
              name="proto"
              label="Object Prototype"
              placeholder="ex: Map.prototype or MyClass"
            >
              <Input
                className="!w-full !min-w-30"
                placeholder="ex: window.obj"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Search
              </Button>
            </Form.Item>
          </Form>
          <div className="text-text-secondary-800 italic mt-10">
            List all live objects in memory that share a specific prototype — a simple wrapper around page.queryObjects().
            <Button type="text" icon={<InfoCircleOutlined />}
              onClick={onAddHelpTab}
            />
          </div>
        </Panel>
        <PanelResizeHandle className="w-2" />
        <Panel>
          <CodeEditor
            value={resultValue}
            showActions={true}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
}


const SearchRuntime = () => {
  const tabsRef = useRef(null);
  const { addHelpTab } = useHelpTab("memory", "search-classes", <SearchClassesHelpTab />)

  const addTab = () => {
    if (tabsRef.current) {
      tabsRef.current.addTab(
        <SearchClassesTab onAddHelpTab={() => addHelpTab(tabsRef, true)} />
      );
    }
  };

  useEffect(() => {
    addTab();
    addHelpTab(tabsRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DynamicTabs
      ref={tabsRef}
      hideAdd={false}
      label="Search"
      noDataHelper={
        <Button className="mt-10" type="primary" onClick={addTab}>
          New Search
        </Button>
      }
      onCloseTab={(key) => {
      }}
      onAddTabRequest={() => {
        addTab();
      }}
    />
  );
}

export default SearchRuntime;