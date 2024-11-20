import React from 'react';
import './Card.css';

const Card = ({ card, index, rotationDegree }) => {
	return (
		<div
			className="card"
			style={{
				position: 'absolute', // Ensure the cards stack on top of each other
				transform: `rotate(${rotationDegree}deg)`, // Apply rotation
				top: '0', // Cards stay at the top of their container
				left: '0', // Cards stay at the left of their container
				zIndex: index, // Ensure cards stack in the correct order
			}}
		>
			<img
				src={card.image}
				alt={`${card.value} of ${card.suit}`}
				className="card-image" // Add a class for the image
			/>
		</div>
	);
};

export default Card;
