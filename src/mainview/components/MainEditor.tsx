import AceEditor from "react-ace";
import { useEditor } from "../contexts/index";

// Ace Editor themes
import "ace-builds/src-min-noconflict/theme-twilight";
import "ace-builds/src-min-noconflict/ext-language_tools";

// Ace Editor modes
import "ace-builds/src-min-noconflict/mode-php";
import "ace-builds/src-min-noconflict/mode-python";
import "ace-builds/src-min-noconflict/mode-javascript";
import "ace-builds/src-min-noconflict/mode-html";
import "ace-builds/src-min-noconflict/mode-css";
import "ace-builds/src-min-noconflict/mode-json";
import "ace-builds/src-min-noconflict/mode-text";

// Função para detectar o modo do Ace com base na extensão do arquivo
function getAceMode(filePath: string | null): string {
  if (!filePath) return "javascript";
  
  const extension = filePath.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'html':
    case 'htm':
      return 'html';
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return 'javascript';
    case 'php':
      return 'php';
    case 'py':
      return 'python';
    default:
      return 'text'; // Fallback seguro para arquivos de texto genéricos (.txt, .log, etc.)
  }
}

export default function MainEditor() {
  // Consome o conteúdo e a função de atualizar do Contexto
  const { fileContent, filePath, handleLoad, handleChangeContent } = useEditor();

  // Detecta o modo dinamicamente a partir do caminho do arquivo
  const currentMode = getAceMode(filePath);

  return (
    <div className="editor-container electrobun-webkit-app-region-no-drag">          
      <AceEditor
        className="electrobun-webkit-app-region-no-drag"
        placeholder="Your qcodelicious..."
        width="100%"
        height="100%"                   
        mode={currentMode}
        theme="twilight"
        name="qcodelicious" 
        onLoad={handleLoad}       
        onChange={(newValue) => handleChangeContent(newValue)} // Atualiza o estado global ao digitar
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
          useWorker: false,
        }}
      />
    </div>
  );
}