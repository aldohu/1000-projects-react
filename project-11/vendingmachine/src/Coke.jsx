import React from 'react';
import { NavLink } from 'react-router-dom';
import './Coke.css';

const Coke = ({ count, increment, decrement, buy }) => {
	return (
		<div className="coke">
			<h1>Coke</h1>
			<p>Count: {count}</p>
			<div className="buttons">
				<button onClick={increment}>Add Coke</button>
				<button onClick={decrement}>Remove Coke</button>
				<button onClick={buy}>Buy Coke</button>
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

export default Coke;
