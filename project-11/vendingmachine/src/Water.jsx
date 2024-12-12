import React from 'react';
import { NavLink } from 'react-router-dom';
import './Water.css';

const Water = ({ count, increment, decrement, buy }) => {
	return (
		<div>
			<h1>Water</h1>
			<p>Count: {count}</p>
			<button onClick={increment}>Add Water</button>
			<button onClick={decrement}>Remove Water</button>
			<button onClick={buy}>Buy Water</button>
			<NavLink
				to="/"
				className={({ isActive }) => `NavLink ${isActive ? 'active' : ''}`}
			>
				Home
			</NavLink>
		</div>
	);
};

export default Water;
