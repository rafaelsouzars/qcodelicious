import { AppMenuBar, Ranger } from './components/index.tsx';
import AceEditor from "react-ace";
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import CssBaseline from '@mui/material/CssBaseline';

import "ace-builds/src-min-noconflict/theme-twilight";
import "ace-builds/src-min-noconflict/ext-language_tools";

function App() {
	//const [count, setCount] = useState(0);

	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	function onChange(newValue: String) {
		console.log("change", newValue);
	}

	return (
		<>
		
			<div className="title-bar electrobun-webkit-app-region-drag" style={{width: "100%"}}>
    			{/*<span className="electrobun-webkit-app-region-no-drag">code</span>*/}
				<ThemeProvider theme={darkTheme}>
					<AppMenuBar/>
				</ThemeProvider>
				{/* Controle de Transparência */}
				<div className="controls electrobun-webkit-app-region-no-drag">
				<label htmlFor="opacity-slider electrobun-webkit-app-region-no-drag">Opacidade:</label>
				<Ranger/>
				</div>
			</div>
		
			<div className="editor-container electrobun-webkit-app-region-no-drag">				
				<AceEditor
					className="electrobun-webkit-app-region-no-drag"
					placeholder="Your qcodelicious..."
					width="100%"
					height="100%"					
					mode="javascript"
					theme="twilight"
					name="UNIQUE_ID_OF_DIV"
					//onLoad={this.onLoad}
					onChange={onChange}
					fontSize={14}
					lineHeight={19}
					showPrintMargin={false}
					showGutter={true}
					highlightActiveLine={true}
					value={`function onLoad(editor) {
					console.log("i've loaded");
					}`}
					setOptions={{
					enableBasicAutocompletion: true,
					enableLiveAutocompletion: true,
					enableSnippets: true,
					enableMobileMenu: true,
					showLineNumbers: true,
					tabSize: 2,
					}}/>
			</div>
		</>
	);
}

export default App;
