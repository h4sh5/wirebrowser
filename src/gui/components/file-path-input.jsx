import { useState } from "react";
import { Input, Form } from "antd";


const FilePathInput = ({ value, onChange, ...props }) => {
  const baseStyle = "inline-block hover:text-primary rounded-sm w-5 text-center border cursor-pointer h-5 p-0 m-0! ml-1! text-xs";

  const selectFile = async (e) => {
    const file = await window.electronAPI.selectDir();
    if (file) {
      onChange(file);
    }
  }

  const handleOnChange = (e) => {
    onChange(e.target.value);
  }

  return (
    <Input {...props} value={value || ""}
      onChange={handleOnChange}
      suffix={<>
        <span
          className={baseStyle}
          onClick={selectFile} title="Select">
          ...
        </span>
      </>}
    />
  );
}

export const FilePathInputFormItem = (props) => {
  return (
    <Form.Item {...props}>
      <FilePathInput />
    </Form.Item>
  );
}

export default FilePathInput;