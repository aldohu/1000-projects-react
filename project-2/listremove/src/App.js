import logo from './logo.svg';
import './App.css';
import List from './List';
import { useState } from 'react';
function App() {
	const [isVisible, setIsVisible] = useState(true);

	const initialList = ['item1', 'item2', 'item3', 'item4'];
	const [list, setList] = useState(initialList);
	const onClick = (itemToRemove) => {
		setList(list.filter((item) => item !== itemToRemove)); // Remove the clicked item
	};
	return (
		<div className="App">
			{list.map((item) => (
				<List
					key={item}
					item={item}
					onClick={() => onClick(item)} // Pass the specific item to remove
				/>
			))}
		</div>
	);
}

export default App;
