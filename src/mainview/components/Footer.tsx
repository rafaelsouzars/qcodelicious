//import React from 'react'
import { useEditor } from '../contexts/index';
import Ranger from './Ranger'

const Footer = () => {
    const { editorMode, filePath, toogleLanguage } = useEditor();

  return (
    <div className="status-bar">
      <span className="display electrobun-webkit-app-region-no-drag" >
        language: 
        <span className="display language-mode electrobun-webkit-app-region-no-drag" onClick={toogleLanguage}> 
          {editorMode}
        </span>
      </span>     
      <div className="controls electrobun-webkit-app-region-no-drag">
        <span className="display electrobun-webkit-app-region-no-drag">{ filePath ?? ""}</span>
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
