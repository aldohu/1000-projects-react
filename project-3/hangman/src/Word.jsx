import React from 'react';
import './Word.css'; // Optional if you want to style it

const Word = ({ wordToGuess, guessedLetters }) => {
	return (
		<div className="word">
			{wordToGuess.split('').map((letter, index) => (
				<span
					key={index}
					className="letter"
				>
					{guessedLetters.includes(letter) ? letter : '_'}
				</span>
			))}
		</div>
	);
};

export default Word;
