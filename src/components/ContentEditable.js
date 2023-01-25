import React, { useEffect } from "react";
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";
import "./ContentEditable.module.css";

function ContentEditable({value, onChange, name, id}) {
  const textRef = React.useRef();
  useEffect(() => {
    if (textRef.current) {
      const obj = new SelectionText(textRef.current);
      console.log("obj:", obj);
    }
  }, []);
  return ( 
      <div data-color-mode="dark">
        <label>
          
        <p style={{ margin: '0.5em 0'}}>Enter with your code</p>
        <CodeEditor
          name={name}
          id={id}
          value={value}
          ref={textRef}
          language="jsx"
          placeholder="import React from 'react'

          const ContentEditable = () => {
            return (
              <div>ContentEditable</div>
            )
          }
          
          export default ContentEditable"
          onChange={onChange}
          padding={0}
          style={{
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            fontSize: 12
          }}
        />
        </label>
      </div>
  );
}

export default ContentEditable