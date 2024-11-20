import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './App.css';
function App() {
	const [deckId, setDeckId] = useState(null); // Store the deck ID
	const [drawnCards, setDrawnCards] = useState([]); // Store drawn cards
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const fetchDeck = async () => {
			try {
				const response = await axios.get(
					'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
				);

				const { data } = response;

				if (!data.success) {
					throw new Error('Failed to fetch the deck');
				}
				setDeckId(data.deck_id);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchDeck();
	}, []);

	const addDrawnCard = (card) => {
		setDrawnCards((prevCards) => [
			...prevCards,
			{ ...card, rotation: Math.random() * 360 }, // Add random rotation
		]);
	};

	const drawCard = async () => {
		if (!deckId || isDrawing) return;

		setIsDrawing(true);

		try {
			const response = await axios.get(
				`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
			);
			const { data } = response;

			if (!data.success) {
				throw new Error('Failed to draw a card');
			}

			console.log('Card drawn:', data.cards[0]); // Debug log

			// Add new card to the drawn cards list using helper function
			addDrawnCard(data.cards[0]);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsDrawing(false);
		}
	};

	useEffect(() => {
		console.log('Drawn cards updated:', drawnCards); // Debug log for drawn cards state
	}, [drawnCards]);

	if (isLoading) {
		return <div>Loading deck...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="App">
			<div className="card-container">
				{drawnCards.length === 0 ? (
					<div>No cards drawn yet!</div>
				) : (
					drawnCards.map((card, index) => (
						<Card
							key={index}
							card={card}
							index={index}
							rotationDegree={card.rotation} // Pass the rotation to each card
						/>
					))
				)}
			</div>
			<button
				onClick={drawCard}
				disabled={isDrawing}
			>
				{isDrawing ? 'Drawing...' : 'Draw Card'}
			</button>
		</div>
	);
}

export default App;
