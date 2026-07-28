import { AppTitleBar, MainEditor } from './components/index';
import { EditorProvider} from './contexts/index';
import 'sweetalert2/dist/sweetalert2.min.css';


function App() {

	return (
		<>
		<EditorProvider>
			<AppTitleBar/>					
			<MainEditor/>		
		</EditorProvider>
		</>
	);
}

export default App;
