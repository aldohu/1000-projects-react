import logo from './logo.svg';
import './App.css';
import Button from './Button';
import { useState } from 'react';
import { RandomIdx } from './Helper';

function App() {
	const colors = ['red', 'green', 'blue', 'yellow'];
	const [color, setColor] = useState('');
	const handleClick = (e) => {
		const targetColor = e.target.style.backgroundColor;
		console.log(targetColor);
		setColor(targetColor);
	};

	return (
		<div
			className="App"
			style={{ backgroundColor: color }}
		>
			{Array.from({ length: 4 }).map((item, index) => (
				<Button
					key={index}
					color={colors[index]}
					onClick={handleClick}
				/>
			))}
		</div>
	);
}

export default App;
