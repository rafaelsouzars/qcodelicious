import { useEffect } from 'react';
import { useEditor } from '../contexts/index';
import AppMenuBar from './AppMenuBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MinimizeIcon from '@mui/icons-material/Minimize';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';

const AppTitleBar = () => {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const { 
      fileName, 
      isChange, 
      isMaximized, 
      handleMaximizeWindow, 
      handleMinimizeWindow, 
      handleCloseWindow 
    } = useEditor(); 
        
      
    useEffect(() => {
      const rootElement = document.getElementById("root");
      if (!rootElement) return;

      if (isMaximized) {
        //const taskbarHeight = window.screen.height - window.screen.availHeight;

        rootElement.style.borderRadius = "0px";
        rootElement.style.margin = "0px";
        rootElement.style.width = "100vw";
        rootElement.style.height = "100vh";
      } else {
        rootElement.style.borderRadius = "12px";
        rootElement.style.margin = "4px";
        rootElement.style.width = "calc(100vw - 8px)";
        rootElement.style.height = "calc(100vh - 8px)";
      }
    }, [isMaximized]);    
    

  return (
    <>
    
      <div className={`title-bar ${isMaximized ? 'electrobun-webkit-app-region-no-drag' : 'electrobun-webkit-app-region-drag'}`} style={{width: "100%"}}>    			
        <ThemeProvider theme={darkTheme}>
            <AppMenuBar/>
        </ThemeProvider>
        <span className="electrobun-webkit-app-region-no-drag">
          <span className="electrobun-webkit-app-region-no-drag">{isChange ? '*' : ''}</span>{fileName}
        </span>
        {/* Controles da janela */}
        <div className="controls electrobun-webkit-app-region-no-drag">
          <ThemeProvider theme={darkTheme}>
            <IconButton aria-label="minimize" size="small" onClick={handleMinimizeWindow}>
              <MinimizeIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="maximize" size="small" onClick={handleMaximizeWindow}>
              {isMaximized ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
            </IconButton>
            <IconButton aria-label="close" size="small" onClick={handleCloseWindow}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </ThemeProvider>
        </div>
      </div>
    
    </>
  )
}

export default AppTitleBar
