import { useEditor } from '../contexts/index';

import {
  Menubar,
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
} from './MenuBar.tsx';


export default function AppMenubar() {  
  // Pega as ações diretamente do contexto
  const { 
    handleNew, 
    handleOpen, 
    handleSave, 
    handleSaveAs, 
    handleCloseWindow, 
    handleWindowAbout, 
    filePath } = useEditor();  

  return (
    <Menubar>
      <MenuRoot>
        <MenuTrigger>File</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4} alignOffset={-2}>
            <MenuPopup>
              <MenuItem onClick={handleNew}>New</MenuItem>
              <MenuItem onClick={handleOpen}>Open…</MenuItem>
              <MenuItem onClick={handleSave}>Save {filePath ? `(${filePath.split(/[\\\/]/).pop()})` : ''}</MenuItem>
              <MenuItem onClick={handleSaveAs}>Save as…</MenuItem>
              <MenuSeparator />
              <MenuSubmenuRoot>
                <MenuSubmenuTrigger>Share</MenuSubmenuTrigger>
                <MenuPortal>
                  <MenuPositioner alignOffset={-4}>
                    <MenuPopup>
                      <MenuItem>Email link</MenuItem>
                      <MenuItem>Copy link</MenuItem>
                    </MenuPopup>
                  </MenuPositioner>
                </MenuPortal>
              </MenuSubmenuRoot>
              <MenuSeparator />
              <MenuItem onClick={handleCloseWindow}>Close</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>

      <MenuRoot>
        <MenuTrigger>Help</MenuTrigger>
        <MenuPortal>
          <MenuPositioner sideOffset={4}>
            <MenuPopup>
              <MenuItem>                
                Documentation
              </MenuItem>
              <MenuItem>Release notes</MenuItem>
              <MenuSeparator />
              <MenuItem onClick={handleWindowAbout}>About</MenuItem>
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </MenuRoot>
    </Menubar>
  );
}
