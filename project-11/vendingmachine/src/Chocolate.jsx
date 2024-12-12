import React from 'react';
import { NavLink } from 'react-router-dom';
import './Chocolate.css';

const Chocolate = ({ count, increment, decrement, buy }) => {
	return (
		<div className="chocolate">
			<h1>Chocolate</h1>
			<p>Count: {count}</p>
			<button onClick={increment}>Add Chocolate</button>
			<button onClick={decrement}>Remove Chocolate</button>
			<button onClick={buy}>Buy Chocolate</button>
			<NavLink
				to="/"
				className={({ isActive }) => `NavLink ${isActive ? 'active' : ''}`}
			>
				Home
			</NavLink>
		</div>
	);
};

export default Chocolate;
