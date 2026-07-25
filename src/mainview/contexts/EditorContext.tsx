// src/context/EditorContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { electrobun } from '../lib/electrobun';

interface EditorContextType {
  filePath: string | null;
  fileContent: string;
  setFileContent: (content: string) => void;
  handleNew: () => void;
  handleOpen: () => Promise<void>;
  handleSave: () => Promise<void>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const DEFAULT_NEW_FILE_CONTENT = ""; // Conteúdo padrão para novos arquivos (pode ser "" ou algum template)

export function EditorProvider({ children }: { children: ReactNode }) {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");

  // 1. Handler para criar um novo arquivo
  function handleNew() {
    console.log("👉 [UI] Criando novo arquivo...");
    
    // Opcional: Se quiser perguntar antes de descartar alterações não salvas no futuro, você pode colocar uma trava aqui.
    setFilePath(null);
    setFileContent(DEFAULT_NEW_FILE_CONTENT);
  }

  // Função para abrir o arquivo via RPC e atualizar o estado do editor
  async function handleOpen() {
    console.log("👉 [UI] Iniciando abertura de arquivo...");
    try {
      const result = await electrobun.rpc?.request.openFile();
      
      if (result) {
        console.log("👉 Arquivo carregado:", result.filePath);
        setFilePath(result.filePath);
        setFileContent(result.content);
      }
    } catch (error) {
      console.error("❌ [RPC Error] Erro ao abrir arquivo:", error);
    }
  }

  // Função para salvar o arquivo atual via RPC
  async function handleSave() {
    console.log("👉 [UI] Salvando arquivo...");
    try {
      const result = await electrobun.rpc?.request.saveFile({
        filePath,
        content: fileContent,
      });

      if (result) {
        console.log("👉 Arquivo salvo com sucesso em:", result.filePath);
        setFilePath(result.filePath);
      }
    } catch (error) {
      console.error("❌ [RPC Error] Erro ao salvar arquivo:", error);
    }
  }

  return (
    <EditorContext.Provider
      value={{
        filePath,
        fileContent,
        setFileContent,
        handleNew,
        handleOpen,
        handleSave,
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