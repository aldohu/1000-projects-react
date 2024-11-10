import React, { useState } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import {
	ones,
	twos,
	threes,
	fours,
	fives,
	sixes,
	threeOfKind,
	fourOfKind,
	fullHouse,
	smallStraight,
	largeStraight,
	yahtzee,
	chance,
} from './Rules';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;
const TOTAL_TURNS = 13;

const Game = () => {
	const [dice, setDice] = useState(
		Array.from({ length: NUM_DICE }, () => Math.ceil(Math.random() * 6)),
	);
	const [locked, setLocked] = useState(Array(NUM_DICE).fill(false));
	const [rollsLeft, setRollsLeft] = useState(NUM_ROLLS);
	const [turnsLeft, setTurnsLeft] = useState(TOTAL_TURNS);
	const [gameOver, setGameOver] = useState(false);
	const [scores, setScores] = useState({
		ones: undefined,
		twos: undefined,
		threes: undefined,
		fours: undefined,
		fives: undefined,
		sixes: undefined,
		threeOfKind: undefined,
		fourOfKind: undefined,
		fullHouse: undefined,
		smallStraight: undefined,
		largeStraight: undefined,
		yahtzee: undefined,
		chance: undefined,
	});
	const [totalScore, setTotalScore] = useState(0);

	const resetGame = () => {
		setDice(
			Array.from({ length: NUM_DICE }, () => Math.ceil(Math.random() * 6)),
		);
		setLocked(Array(NUM_DICE).fill(false));
		setRollsLeft(NUM_ROLLS);
		setTurnsLeft(TOTAL_TURNS); // Reset turns left to 13
		setTotalScore(0); // Reset total score
		setScores({
			ones: undefined,
			twos: undefined,
			threes: undefined,
			fours: undefined,
			fives: undefined,
			sixes: undefined,
			threeOfKind: undefined,
			fourOfKind: undefined,
			fullHouse: undefined,
			smallStraight: undefined,
			largeStraight: undefined,
			yahtzee: undefined,
			chance: undefined,
		});
		setGameOver(false);
	};

	const roll = () => {
		if (rollsLeft <= 0) return; // Prevent rolling if no rolls left

		setDice((prevDice) =>
			prevDice.map((d, i) => (locked[i] ? d : Math.ceil(Math.random() * 6))),
		);
		setLocked(locked.map((l) => (rollsLeft > 1 ? l : false))); // Don't lock dice when only 1 roll left
		setRollsLeft((prevRollsLeft) => prevRollsLeft - 1); // Decrease rolls left
	};

	const toggleLocked = (idx) => {
		setLocked((prevLocked) => [
			...prevLocked.slice(0, idx),
			!prevLocked[idx],
			...prevLocked.slice(idx + 1),
		]);
	};

	const doScore = (rulename) => {
		if (scores[rulename] !== undefined) {
			console.log(`${rulename} has already been scored.`);
			return; // Prevent scoring twice
		}

		console.log(`Scoring for: ${rulename}`);
		const ruleFnMap = {
			ones,
			twos,
			threes,
			fours,
			fives,
			sixes,
			threeOfKind,
			fourOfKind,
			fullHouse,
			smallStraight,
			largeStraight,
			yahtzee,
			chance,
		};
		const ruleFn = ruleFnMap[rulename];
		if (ruleFn) {
			const score = ruleFn(dice); // Get the score from the rule function
			setScores((prevScores) => ({
				...prevScores,
				[rulename]: score, // Set the score for the specific rule
			}));
			setTotalScore((prevTotalScore) => prevTotalScore + score);
			setTurnsLeft((prevTurnsLeft) => prevTurnsLeft - 1); // Decrease turns left

			if (turnsLeft <= 1) {
				setGameOver(true); // End the game if no turns are left
			} else {
				setRollsLeft(NUM_ROLLS);
				setLocked(Array(NUM_DICE).fill(false)); // Reset dice locks
			}
		} else {
			console.error(`No rule function found for: ${rulename}`);
		}
	};

	return (
		<div className="Game">
			<header className="Game-header">
				<h1 className="App-title">Yahtzee!</h1>

				<section className="Game-dice-section">
					<Dice
						dice={dice}
						locked={locked}
						handleClick={toggleLocked}
					/>
					<div className="Game-button-wrapper">
						<button
							className="Game-reroll"
							disabled={locked.every((x) => x) || rollsLeft === 0}
							onClick={roll}
						>
							{rollsLeft} Rerolls Left
						</button>
					</div>
				</section>
			</header>
			<ScoreTable
				doScore={doScore}
				scores={scores}
				totalScore={totalScore}
				turnsLeft={turnsLeft}
			/>
			<div className="Game-over">
				{gameOver && <h2>Game Over!</h2>}
				<p>Your final score is {totalScore}</p>
				<button
					onClick={resetGame}
					style={{
						border: 'none',
						backgroundColor: '#9c27b0',
						borderRadius: '5px',
						color: 'white',
						padding: '10px 20px',
						cursor: 'pointer',
					}}
				>
					Play Again
				</button>
			</div>
		</div>
	);
};

export default Game;
