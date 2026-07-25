import AceEditor from "react-ace";
import { useEditor } from "../contexts/index";

// Ace Editor Builds
import "ace-builds/src-min-noconflict/theme-twilight";
import "ace-builds/src-min-noconflict/ext-language_tools";

export default function MainEditor() {
  // Consome o conteúdo e a função de atualizar do Contexto
  const { fileContent, setFileContent } = useEditor();

  return (
    <div className="editor-container electrobun-webkit-app-region-no-drag">          
      <AceEditor
        className="electrobun-webkit-app-region-no-drag"
        placeholder="Your qcodelicious..."
        width="100%"
        height="100%"                   
        mode="javascript"
        theme="twilight"
        name="UNIQUE_ID_OF_DIV"        
        onChange={(newValue) => setFileContent(newValue)} // Atualiza o estado global ao digitar
        value={fileContent}                               // Reflete o texto carregado do arquivo
        fontSize={14}
        lineHeight={19}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          enableMobileMenu: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}