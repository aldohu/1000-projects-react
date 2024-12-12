import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Vendingmachine from './Vendingmachine';
import Water from './Water';
import Coke from './Coke';
import Chocolate from './Chocolate';

function App() {
	const [coke, setCoke] = useState(() => {
		const savedCoke = localStorage.getItem('coke');
		return savedCoke ? JSON.parse(savedCoke) : 0;
	});

	const [water, setWater] = useState(() => {
		const savedWater = localStorage.getItem('water');
		return savedWater ? JSON.parse(savedWater) : 0;
	});

	const [chocolate, setChocolate] = useState(() => {
		const savedChocolate = localStorage.getItem('chocolate');
		return savedChocolate ? JSON.parse(savedChocolate) : 0;
	});

	const saveToLocalStorage = (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	// Generalized increment and decrement functions
	const incrementItem = (setter, value, key) => {
		const newValue = value + 1;
		setter(newValue);
		saveToLocalStorage(key, newValue);
	};

	const decrementItem = (setter, value, key) => {
		const newValue = Math.max(0, value - 1);
		setter(newValue);
		saveToLocalStorage(key, newValue);
	};

	const buyItem = (setter, key) => {
		setter(0);
		saveToLocalStorage(key, 0);
	};

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
							increment={() => incrementItem(setWater, water, 'water')}
							decrement={() => decrementItem(setWater, water, 'water')}
							buy={() => buyItem(setWater, 'water')}
						/>
					}
				/>
				<Route
					path="/Coke"
					element={
						<Coke
							count={coke}
							increment={() => incrementItem(setCoke, coke, 'coke')}
							decrement={() => decrementItem(setCoke, coke, 'coke')}
							buy={() => buyItem(setCoke, 'coke')}
						/>
					}
				/>
				<Route
					path="/Chocolate"
					element={
						<Chocolate
							count={chocolate}
							increment={() =>
								incrementItem(setChocolate, chocolate, 'chocolate')
							}
							decrement={() =>
								decrementItem(setChocolate, chocolate, 'chocolate')
							}
							buy={() => buyItem(setChocolate, 'chocolate')}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
