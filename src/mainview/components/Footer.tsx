//import React from 'react'
import { useEditor } from '../contexts/index';
import Ranger from './Ranger'

const Footer = () => {
    const { editorMode, filePath, toogleLanguage } = useEditor();

  return (
    <div className="status-bar">
      <span className="electrobun-webkit-app-region-no-drag" onDoubleClick={toogleLanguage}>language: {editorMode}</span>     
      <div className="controls electrobun-webkit-app-region-no-drag">
        <span className="path-display electrobun-webkit-app-region-no-drag">{ filePath ?? ""}</span>
      </div>
      {/* Controle de Transparência */}
      <div className="controls electrobun-webkit-app-region-no-drag">
          <label htmlFor="opacity-slider electrobun-webkit-app-region-no-drag">Opacity:</label>
          <Ranger/>
      </div>
    </div>
  )
}

export default Footer
