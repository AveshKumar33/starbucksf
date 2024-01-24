import React, { useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface MyEditorProps {
  value: any;
  onChange: any;
}

const MyEditor: React.FC<MyEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current;
    }
  }, []);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
    ],
  };
  return (
    <>
      heelo
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        placeholder="Write something..."
        modules={modules}
      />
    </>
  );
};

export default MyEditor;
