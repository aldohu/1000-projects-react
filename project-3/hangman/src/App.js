import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

import Hangman from './Hangman';
function App() {
	return (
		<div className="App">
			<Hangman />
		</div>
	);
}

export default App;
