import Editor from 'react-simple-code-editor'
//import { useState } from 'react';
import 'prismjs/themes/prism-tomorrow.css'
import './Editor.css'

const EditorPrism = ({value, onChange, highlights, placeholder}) => {
  
  return (
    <div className='window'>
      <div className="title-bar">
        <div className="title-buttons">
          <div className="title-button"></div>
          <div className="title-button"></div>
          <div className="title-button"></div>
        </div>
      </div>
      <div className='editor_wrap'>
        <label className='labelEditorPrism'>
          Enter with your code
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={highlights}
          padding={10}
          placeholder={placeholder}
          style={{
            fontFamily: '"Arial", "Helvetica", "sans-serif"',
            fontSize: 14
          }}
        />
        </label>
      </div>
    </div>
  )
}

export default EditorPrism
