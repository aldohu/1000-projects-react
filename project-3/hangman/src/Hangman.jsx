import React, { useState, useEffect } from 'react';
import Image from './Image'; // Importing the Image component
import Word from './Word'; // Importing the Word component
import Keyboard from './Keyboard'; // Importing the Keyboard component

import './Hangman.css';
import { useCookies } from 'react-cookie';

const Hangman = () => {
	const [wordToGuess, setWordToGuess] = useState('');
	const [guessedLetters, setGuessedLetters] = useState([]);
	const [guesses, setGuesses] = useState(6);
	const [isGameWon, setIsGameWon] = useState(false);
	const [isGameLost, setIsGameLost] = useState(false);
	const [cookies, setCookie] = useCookies(['name']);
	const [winStreak, setWinStreak] = useState(0);
	const [lossStreak, setLossStreak] = useState(0);
	const [highScore, setHighScore] = useState(0);

	const fetchWord = async () => {
		try {
			const response = await fetch(
				'https://random-word-api.herokuapp.com/word?number=1',
			);
			const data = await response.json();
			return data[0];
		} catch (error) {
			console.error('Error fetching the word:', error);
		}
	};

	useEffect(() => {
		const initGame = async () => {
			const initialWord = await fetchWord();
			setWordToGuess(initialWord);
		};
		initGame();
	}, []);

	const handleGuess = (letter) => {
		if (!guessedLetters.includes(letter)) {
			setGuessedLetters((prevLetters) => [...prevLetters, letter]);
			if (!wordToGuess.includes(letter)) {
				setGuesses((prevGuesses) => prevGuesses - 1);

				if (guesses === 0) {
					setIsGameLost(true);
				}
			}
		} else {
			setIsGameWon(true);
		}
	};

	const resetGame = async () => {
		const newWord = await fetchWord();
		setWordToGuess(newWord);
		console.log(newWord);
		setGuessedLetters([]);
		setGuesses(6);
		setIsGameWon(false);
		setIsGameLost(false);
	};

	const handlePlayAgain = () => {
		resetGame();
	};

	const handleHighScore = () => {
		setCookie('winStreak', winStreak, { path: '/' });
		setCookie('lossStreak', lossStreak, { path: '/' });
		setCookie('highScore', highScore, { path: '/' });
	};
	useEffect(() => {
		const handleKeydown = (event) => {
			const letter = event.key.toLowerCase();
			if (/^[a-z]$/.test(letter)) {
				handleGuess(letter);
			}
		};

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, [guessedLetters, wordToGuess]);
	useEffect(() => {
		if (guesses === 0) {
			setIsGameLost(true);
		}
	}, [guesses]);

	useEffect(() => {
		if (guessedLetters.length > 0) {
			const uniqueLettersInWord = new Set(wordToGuess.split(''));
			const uniqueLettersGuessed = new Set(guessedLetters);
			if (
				[...uniqueLettersInWord].every((letter) =>
					uniqueLettersGuessed.has(letter),
				)
			) {
				setIsGameWon(true);
			}
		}
	}, [guessedLetters, wordToGuess]);

	useEffect(() => {
		if (isGameWon) {
			setWinStreak((prevStreak) => prevStreak + 1);
			setHighScore((prevHighScore) => Math.max(prevHighScore, winStreak));
			setCookie('name', winStreak, { path: '/' });
		}
	}, [isGameWon]);

	useEffect(() => {
		if (isGameLost) {
			setLossStreak((prevStreak) => prevStreak + 1);
			setHighScore((prevHighScore) => Math.max(prevHighScore, lossStreak));
			setCookie('name', lossStreak, { path: '/' });
		}
	}, [isGameLost]);

	return (
		<div className="Hangman">
			<Image />
			<Word
				guessedLetters={guessedLetters}
				wordToGuess={wordToGuess}
			/>
			<Keyboard
				onGuess={handleGuess}
				guessedLetters={guessedLetters}
			/>
			<div>
				<p>Guesses left: {guesses}</p>
				<p>Win streak: {winStreak}</p>
				<p>Loss streak: {lossStreak}</p>
			</div>
			{isGameLost && <p>You lost! The word was: {wordToGuess}</p>}
			{isGameWon && <p>Congratulations, you won!</p>}
			<button onClick={handlePlayAgain}>Play Again</button>
			<button onClick={handleHighScore}>High Score</button>
		</div>
	);
};

export default Hangman;
