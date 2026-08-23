import { createContext, useContext, useState, ReactNode } from 'react';
import { electrobun } from '../lib/electrobun';
import Swal from 'sweetalert2';
import { WindowAbout } from '../utils/index';

interface EditorContextType {
  filePath: string | null;
  fileContent: string;
  fileName: string;
  isChange: boolean;
  isMaximized: boolean; 
  isAnchored: boolean;
  editorMode: string; 
  setFileContent: (content: string) => void;
  setEditorMode: (mode: string) => void;
  handleLoad: () => void;
  handleNew: () => void;
  handleChangeContent: (newValue: string) => void;
  handleOpen: () => Promise<void>;
  handleSave: () => Promise<void>;
  handleSaveAs: () => Promise<void>;  
  handleResizeWindow: (
    direction: "top" | "left" | "top-left" |"right" | "bottom" | "bottom-right", 
    coordinate: {deltaX: number, deltaY: number}
  ) => Promise<void>;
  toogleAnchoreWindow: () => Promise<void>;
  handleMaximizeWindow: () => Promise<void>;  
  handleMinimizeWindow: () => Promise<void>;
  handleCloseWindow: () => Promise<void>;
  handleWindowAbout: () => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const DEFAULT_NEW_FILE_CONTENT = ""; // Conteúdo padrão para novos arquivos (pode ser "" ou algum template)

export function EditorProvider({ children }: { children: ReactNode }) {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");  
  const [fileName, setFileName] = useState<string>("");
  const [newFileCounter, setNewFileCounter] = useState<number>(0);
  const [isNewFile, setIsNewFile] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [isAnchored, setIsAnchored] = useState<boolean>(false);
  const [editorMode, setEditorMode] = useState<string>("");

  const openFile = async () => {    
    const result = await electrobun.rpc?.request.openFile();
      
    if (result) {
      console.log("👉 Arquivo carregado:", result.filePath);        
      setFileName(result.fileName ?? "filename");
      setFilePath(result.filePath);
      setFileContent(result.content);

      if (isChange) setIsChange(false); 
      if (isNewFile) setIsNewFile(false);       
    }
  }
  
  const newEditorFile = () => {
    setFilePath(null);
    setFileContent(DEFAULT_NEW_FILE_CONTENT);
    setNewFileCounter(newFileCounter + 1);
    setFileName(`untilited${newFileCounter}.txt`);
    setEditorMode("text");
    setIsNewFile(true);
    setIsChange(false);
  };

  function handleLoad() {
    newEditorFile();
  }

  // Função para criar um novo arquivo
  function handleNew() {
    console.log("👉 [UI] Criando novo arquivo...");

    if (isChange) {      
      Swal.fire({        
        title: "Do you want to save the changes?",
        icon: "warning",
        theme: "dark",  
        customClass: {
          title: 'swal-title',
        },      
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //handleSave();
          if (isNewFile) setIsNewFile(false);
          Swal.fire({
            title: "Saved!", 
            icon: "success", 
            theme: "dark",
            customClass: {
              title: 'swal-title',
            }
          });
        }
        else if (result.isDenied) {
          Swal.fire({
            title: "Changes are not saved", 
            icon: "info", 
            theme: "dark",
            customClass: {
              title: 'swal-title',
            }
          }).then((result) => {
            if (result.isConfirmed) newEditorFile();
            console.log("👉 [UI] Um novo arquivo foi criado...");
          });          
        }
      });      
    }
    else if (!isNewFile && !isChange) {
      newEditorFile();
    }   
  }  

  // Função para monitorar mudanças no conteúdo do editor
  function handleChangeContent(newValue: string) {
    console.log("📝 [UI] Modificando arquivo...");
    
    if (fileContent !== newValue) {      
      setIsChange(true);
      setFileContent(newValue);
    }    
  }  

  // Função para abrir o arquivo via RPC e atualizar o estado do editor
  async function handleOpen() {    
    try {
      console.log("👉 [UI] Iniciando abertura de arquivo...");

      if (isChange) {      
        Swal.fire({        
          title: "Do you want to save the changes?",
          icon: "warning",
          theme: "dark",  
          customClass: {
            title: 'swal-title',
          },      
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            handleSave();            
          }
          else if (result.isDenied) {
            Swal.fire({
              title: "Changes are not saved", 
              icon: "info", 
              theme: "dark",
              customClass: {
                title: 'swal-title',
              }
            }).then((result) => {
              if (result.isConfirmed) openFile();
              console.log("👉 [UI] Um novo arquivo foi criado...");
            });          
          }
        });      
      }
      else {
        openFile();
      }   
      
    } catch (error) {
      console.error("❌ [RPC Error] Erro ao abrir arquivo:", error);
    }
  }

  // Função para salvar o arquivo atual via RPC
  async function handleSave() {
    console.log("👉 [UI] Salvando arquivo...");
    try {
      // Caso seja um novo arquivo
      if (isNewFile) {
        handleSaveAs();
      }
      else {
        // Caso seja um arquivo aberto
        const result = await electrobun.rpc?.request.saveFile({
          filePath,
          content: fileContent,
        });

        if (result) {
          console.log("👉 Arquivo salvo com sucesso em:", result.filePath);
          setFilePath(result.filePath);
          setIsChange(false);
          if (isNewFile) setIsNewFile(false);

          Swal.fire({
            title: "Saved!", 
            icon: "success", 
            theme: "dark",
            customClass: {
              title: 'swal-title',
            }
          });
        }
      }      
    } catch (error) {
      console.error("❌ [RPC Error] Erro ao salvar arquivo:", error);
    }

  }

  // Função "salvar como" para arquivo atual via RPC
  async function handleSaveAs() {
    console.log("👉 [UI] Salvando arquivo...");
    try {
      // Abre a janela para renomear o arquivo
      Swal.fire({
        title: "Save file...",
        input: "text",
        theme: "dark",
        customClass: {
          title: "swal-title",          
        },
        inputLabel: "Name file",
        inputPlaceholder: "Insert a name file. Example: 'code.txt'",
        inputValue: fileName,
        showCancelButton: true,
        inputValidator: (value) => {
          // Validação de nome de arquivo
          const regexFileName = /^([.]?[^<>:"\/\\|?][a-zA-Z0-9-_]+)+(([.]([a-zA-Z0-9]){1,5})?)$/gm;

          if (!value || !value.match(regexFileName)) return "You need to write something!"; 

        }
      }).then(async (result) => {
        // Caso seja confirmado o salvamento
        if (result.isConfirmed) {
          const resultRPC = await electrobun.rpc?.request.saveAsFile({
            fileName: result.value,
            content: fileContent,
          });

          // Se houver retorno do RPC saveAsFile
          if (resultRPC) {
            console.log("👉 Arquivo salvo com sucesso em:", resultRPC.filePath);
            setFileName(resultRPC.fileName);
            setFilePath(resultRPC.filePath);
            if (isChange) setIsChange(false);
            if (isNewFile) setIsNewFile(false);

            Swal.fire({
              title: "Saved!", 
              icon: "success", 
              theme: "dark",
              customClass: {
                title: 'swal-title',
              }
            });
          }
          else {            
            Swal.fire({
              title: "Changes are not saved", 
              icon: "warning", 
              theme: "dark",
              customClass: {
                title: 'swal-title',
              }
            })
          }
        }
        else if (result.isDismissed) { 
          Swal.fire({
            title: "Changes are not saved", 
            icon: "warning", 
            theme: "dark",
            customClass: {
              title: 'swal-title',
            }
          })
        }
      });      
    } catch (error) {
      console.error("❌ [RPC Error] Erro ao salvar arquivo:", error);
    }
  }  

  async function handleResizeWindow (
    direction: "top" | "left" | "top-left" | "right" | "bottom" | "bottom-right", 
    coordinate: {
      deltaX: number, 
      deltaY: number
    }
  ) {
    try {
      await electrobun.rpc?.request.resizeWindow({direction: direction, coordinate});
    }
    catch (error) {
      console.error("❌ [RPC Error]: Erro ao chamar resizeWindow:", error);
    }
  }

  async function toogleAnchoreWindow() {
    try {
      const isAnchoredWindow = await electrobun.rpc?.request.toogleAnchoreWindow();

      if (isAnchoredWindow) {
        setIsAnchored(isAnchoredWindow);
      }
      else {
        setIsAnchored(false);
      }
    }
    catch (error) {
      console.error("❌ [RPC Error]: Erro ao chamar toogleAmchoreWindow:", error);
    }
  }

  async function handleMaximizeWindow() {
    try {
      await electrobun.rpc?.request.maximizeWindow();

      const isMaximizedWindows = await electrobun.rpc?.request.isMaximizedWindow();

      if (isMaximizedWindows) {
        setIsMaximized(true);
      }
      else {
        setIsMaximized(false);
      }
    }
    catch (error) {
      console.error("❌ [RPC Error]: Erro ao chamar closeWindow:", error);
    }
  }  

  async function handleMinimizeWindow() {
    try {
      await electrobun.rpc?.request.minimizeWindow();
    }
    catch (error) {
      console.error("❌ [RPC Error]: Erro ao chamar closeWindow:", error);
    }
  }

  async function handleCloseWindow() {
    try {
      await electrobun.rpc?.request.closeWindow();
    }
    catch (error) {
      console.error("❌ [RPC Error]: Erro ao chamar closeWindow:", error);
    }
  }

  async function handleWindowAbout() {
    await WindowAbout({
      title: 'qCodelicious v1.0.0',
      text: 'Simple Code Editor',
      imageWidth: 128,
      imageHeight: 128,
      imageAlt: 'qCodelicious App Icon'
    });
  }

  return (
    <EditorContext.Provider
      value={{
        filePath,
        fileContent,
        fileName,
        isChange,
        isMaximized,
        isAnchored,
        editorMode,
        setFileContent,
        setEditorMode,
        handleLoad,
        handleNew,
        handleChangeContent,
        handleOpen,
        handleSave,
        handleSaveAs,        
        handleResizeWindow,
        toogleAnchoreWindow,
        handleMaximizeWindow,        
        handleMinimizeWindow,
        handleCloseWindow,
        handleWindowAbout,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

// Hook personalizado para consumir o contexto com segurança
export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor deve ser usado dentro de um EditorProvider");
  }
  return context;
}