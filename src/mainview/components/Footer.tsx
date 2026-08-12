//import React from 'react'
import { useEditor } from '../contexts/index';
import Ranger from './Ranger'

const Footer = () => {
    const { editorMode } = useEditor();

  return (
    <div className="status-bar">
      <span className="langague-display electrobun-webkit-app-region-no-drag">language: {editorMode}</span>
      {/* Controle de Transparência */}
      <div className="controls electrobun-webkit-app-region-no-drag">
          <label htmlFor="opacity-slider electrobun-webkit-app-region-no-drag">Opacity:</label>
          <Ranger/>
      </div>
    </div>
  )
}

export default Footer
