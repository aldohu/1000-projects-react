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

const Game = () => {
	const [dice, setDice] = useState(
		Array.from({ length: NUM_DICE }, () => Math.ceil(Math.random() * 6)),
	);
	const [locked, setLocked] = useState(Array(NUM_DICE).fill(false));
	const [rollsLeft, setRollsLeft] = useState(NUM_ROLLS);
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
		setLocked(Array(NUM_DICE).fill(false)); // Unlock all dice
		setRollsLeft(NUM_ROLLS); // Reset the number of rolls
	};
	const roll = () => {
		if (rollsLeft <= 0) {
			// Game reset when rolls are over
			resetGame();
			return;
		} // Prevent rolling if no rolls left

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
			// Reset rolls and locked dice after scoring, except for the 'chance' rule
			setRollsLeft(NUM_ROLLS);
			if (rulename !== 'chance') {
				setLocked(Array(NUM_DICE).fill(false)); // Reset locked state only if it's not 'chance'
			}
			resetGame();
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
							disabled={locked.every((x) => x)}
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
			/>
		</div>
	);
};

export default Game;
