import React from 'react';
import { NavLink } from 'react-router-dom';

const Water = ({ count, increment, decrement }) => {
	return (
		<div>
			<h1>Water</h1>
			<p>Count: {count}</p>
			<button onClick={increment}>Add Water</button>
			<button onClick={decrement}>Remove Water</button>
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
