import React from 'react';
import { NavLink } from 'react-router-dom';

const Coke = ({ count, increment, decrement }) => {
	return (
		<div>
			<h1>Coke</h1>
			<p>Count: {count}</p>
			<button onClick={increment}>Add Coke</button>
			<button onClick={decrement}>Remove Coke</button>
			<NavLink
				to="/"
				className={({ isActive }) => `NavLink ${isActive ? 'active' : ''}`}
			>
				Home
			</NavLink>
		</div>
	);
};

export default Coke;
