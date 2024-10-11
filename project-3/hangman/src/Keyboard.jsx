import React from 'react';
import './Keyboard.css'; // Optional if you want to style it

const Keyboard = ({ onGuess, guessedLetters }) => {
	const letters = Array.from(Array(26).keys()).map((i) =>
		String.fromCharCode(i + 97),
	);

	return (
		<div className="Keyboard">
			{letters.map((letter) => (
				<button
					key={letter}
					onClick={() => onGuess(letter)}
					disabled={guessedLetters.includes(letter)}
					className={guessedLetters.includes(letter) ? 'guessed' : ''}
				>
					{letter}
				</button>
			))}
		</div>
	);
};

export default Keyboard;
