import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Vendingmachine from './Vendingmachine';
import Water from './Water';
import Coke from './Coke';
import Chocolate from './Chocolate';

function App() {
	const [coke, setCoke] = useState(0);
	const [water, setWater] = useState(0);
	const [chocolate, setChocolate] = useState(0);

	// Generalized increment and decrement functions
	const incrementItem = (setter, value) => setter(value + 1);
	const decrementItem = (setter, value) => setter(Math.max(0, value - 1));

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={<Vendingmachine />}
				/>
				<Route
					path="/Water"
					element={
						<Water
							count={water}
							increment={() => incrementItem(setWater, water)}
							decrement={() => decrementItem(setWater, water)}
						/>
					}
				/>
				<Route
					path="/Coke"
					element={
						<Coke
							count={coke}
							increment={() => incrementItem(setCoke, coke)}
							decrement={() => decrementItem(setCoke, coke)}
						/>
					}
				/>
				<Route
					path="/Chocolate"
					element={
						<Chocolate
							count={chocolate}
							increment={() => incrementItem(setChocolate, chocolate)}
							decrement={() => decrementItem(setChocolate, chocolate)}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
