
import { Button, Modal } from 'antd';
import { useGlobal } from "@/global-context";
import CodeEditor from "@/components/code-editor";


const ScratchpadModal = ({ open, onClose }) => {
  const { settings, updateSettings } = useGlobal();
  
  const saveSettings = (v) => {
    updateSettings("scratchpad", {content: v || ""});
  }

  return (
    <Modal
      open={open}
      title="Scratchpad"
      onOk={onClose}
      onCancel={onClose}
      destroyOnHidden={true}
      style={{ top: 20, height: "90vh" }}
      styles={{
        body: {
          height: "calc(90vh - 110px)",
          overflowY: "auto",
        },
      }}
      width="90vw"
      footer={[
        <Button type="primary" key="close" onClick={onClose}>Close</Button>,
      ]}
    >
      <CodeEditor
        showActions={true}
        language="plaintext"
        onChange={((v) => saveSettings(v))}
        value={settings?.scratchpad?.content ?? ""}
      />
    </Modal>
  );
};

export default ScratchpadModal;