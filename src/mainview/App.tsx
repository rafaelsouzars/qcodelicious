import { Ranger } from './components/index.tsx';
import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/theme-twilight";
import "ace-builds/src-min-noconflict/ext-language_tools";

function App() {
	//const [count, setCount] = useState(0);

	function onChange(newValue: String) {
		console.log("change", newValue);
	}

	return (
		<>
			<div className="title-bar electrobun-webkit-app-region-drag">
    			<span>code</span>
    
				{/* Controle de Transparência */}
				<div className="controls electrobun-webkit-app-region-no-drag">
				<label htmlFor="opacity-slider electrobun-webkit-app-region-no-drag">Opacidade:</label>
				<Ranger></Ranger>
				</div>
			</div>

			<div className="editor-container">
				{/*<textarea placeholder="Digite seu código e veja o fundo mudar..."></textarea>*/}
				<AceEditor
					className="editor electrobun-webkit-app-region-no-drag"
					placeholder="Your codedelicious..."
					mode="javascript"
					theme="twilight"
					name="UNIQUE_ID_OF_DIV"
					//onLoad={this.onLoad}
					onChange={onChange}
					fontSize={14}
					lineHeight={19}
					showPrintMargin={true}
					showGutter={true}
					highlightActiveLine={true}
					value={`function onLoad(editor) {
					console.log("i've loaded");
					}`}
					setOptions={{
					enableBasicAutocompletion: false,
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
