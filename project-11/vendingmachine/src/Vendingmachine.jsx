import React from 'react';
import { NavLink } from 'react-router-dom';
import './Vendingmachine.css';
const Vendingmachine = () => {
	return (
		<div className="vendingmachine">
			<h1>Vendingmachine</h1>

			<div className="links">
				<NavLink
					to="/Water"
					className={({ isActive }) => `NavLink ${isActive ? 'active' : ''}`}
				>
					Water
				</NavLink>
				<NavLink
					to="/Coke"
					className={({ isActive }) => `NavLink ${isActive ? 'active' : ''}`}
				>
					Coke
				</NavLink>
				<NavLink
					to="/Chocolate"
					className={({ isActive }) => `NavLink ${isActive ? 'active' : ''}`}
				>
					Chocolate
				</NavLink>
			</div>
		</div>
	);
};

export default Vendingmachine;
