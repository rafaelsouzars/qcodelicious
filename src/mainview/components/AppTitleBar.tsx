import { useEditor } from '../contexts/index';
import AppMenuBar from './AppMenuBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const AppTitleBar = () => {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const { fileName, isChange } = useEditor();

  return (
    <>
      <div className="title-bar electrobun-webkit-app-region-drag" style={{width: "100%"}}>    			
        <ThemeProvider theme={darkTheme}>
            <AppMenuBar/>
        </ThemeProvider>
        <span className="electrobun-webkit-app-region-no-drag">
          <span className="electrobun-webkit-app-region-no-drag">{isChange ? '*' : ''}</span>{fileName}
        </span>
        {/* Controles da janela */}
        <div className="controls electrobun-webkit-app-region-no-drag">
            Window Controls
        </div>
      </div>
    </>
  )
}

export default AppTitleBar
