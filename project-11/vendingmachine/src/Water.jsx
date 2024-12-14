import React from 'react';
import { NavLink } from 'react-router-dom';
import './Water.css';

const Water = ({ count, increment, decrement, buy }) => {
	return (
		<div className="water">
			<h1>Water</h1>
			<p>Count: {count}</p>
			<div className="buttons">
				<button onClick={increment}>Add Water</button>
				<button onClick={decrement}>Remove Water</button>
				<button onClick={buy}>Buy Water</button>{' '}
			</div>

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
