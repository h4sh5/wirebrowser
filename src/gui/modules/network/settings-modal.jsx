import { useEffect, useRef, useImperativeHandle } from 'react';
import { Button, Modal, Form, Tabs, Input, Select } from 'antd';
import { useGlobal } from "@/global-context";
import { requestTypes } from "@/constants";

const InterceptorSettings = ({ ref }) => {
  const [formScope] = Form.useForm();
  const { settings } = useGlobal();

  useEffect(() => {
    if (!settings) {
      return;
    }
    formScope.setFieldsValue({
      ...(settings?.network?.interceptor.scope || {})
    });

  }, [settings]);

  useImperativeHandle(ref, () => ({
    get: () => {
      return {
        ...(settings?.network?.interceptor || {}),
        scope: formScope.getFieldsValue(),
      };
    },
  }));


  return (<div>
    <p className="text-xl mb-3">Scope</p>
    <Form form={formScope} >
      <p className="mb-1">
        Only requests whose URLs start with these prefixes will be intercepted.
      </p>
      <Form.Item
        name="prefixes"
      >
        <Input.TextArea
          placeholder="One prefix per line"
          autoSize={{ minRows: 3, maxRows: 25 }}
        />
      </Form.Item>
      <p className="mb-1">
        Select which request types should be intercepted.
      </p>
      <Form.Item
        name="reqType"
        className="flex-none min-w-80"
      >
        <Select
          mode="tags"
          options={requestTypes.map(t => ({
            value: t,
            label: t
          }))}
        />
      </Form.Item>
    </Form>
  </div>

  );
}


const SettingsModal = ({ open, onClose }) => {
  const { updateSettings } = useGlobal();
  const interceptorSettigsRef = useRef();
  const tabItems = [
    {
      key: "interceptor",
      label: "Interceptor",
      forceRender: true,
      children: <InterceptorSettings ref={interceptorSettigsRef} />
    },
  ];

  const saveSettings = () => {
    const newSettings = {
      interceptor: interceptorSettigsRef.current.get(),
    };
    updateSettings("network", newSettings);
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Network Settings"
      onOk={onClose}
      onCancel={onClose}
      destroyOnHidden={true}
      style={{ top: 20, height: "90vh" }}
      keyboard={false}
      maskClosable={false}
      styles={{
        body: {
          height: "calc(90vh - 110px)",
          overflowY: "auto",
        },
      }}
      width="90vw"
      footer={[
        <Button key="cancel" onClick={onClose}>Cancel</Button>,
        <Button type="primary" key="save" onClick={saveSettings}>Save</Button>,
      ]}
    >
      <Tabs
        items={tabItems}
        animated={false}
      />
    </Modal>
  );
};

export default SettingsModal;