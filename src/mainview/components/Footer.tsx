//import React from 'react'
import { useEditor } from '../contexts/index';

const Footer = () => {
    const { editorMode } = useEditor();

  return (
    <div className="status-bar">
      <span>language: {editorMode}</span>
      <div>range</div>
    </div>
  )
}

export default Footer
