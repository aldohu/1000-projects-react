import React from 'react';
import { NavLink } from 'react-router-dom';

const Chocolate = ({ count, increment, decrement }) => {
	return (
		<div>
			<h1>Chocolate</h1>
			<p>Count: {count}</p>
			<button onClick={increment}>Add Chocolate</button>
			<button onClick={decrement}>Remove Chocolate</button>
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
