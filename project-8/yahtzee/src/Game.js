import React, { useState } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

const Game = () => {
	const [dice, setDice] = useState(
		Array.from({ length: NUM_DICE }, () => Math.ceil(Math.random() * 6)),
	);
	console.log(dice);
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

	const roll = () => {
		setDice((prevDice) =>
			prevDice.map((d, i) => (locked[i] ? d : Math.ceil(Math.random() * 6))),
		);
		setLocked(rollsLeft > 1 ? locked : Array(NUM_DICE).fill(true));
		setRollsLeft((prevRollsLeft) => prevRollsLeft - 1);
	};

	const toggleLocked = (idx) => {
		setLocked((prevLocked) => [
			...prevLocked.slice(0, idx),
			!prevLocked[idx],
			...prevLocked.slice(idx + 1),
		]);
	};

	const doScore = (rulename, ruleFn) => {
		setScores((prevScores) => ({
			...prevScores,
			[rulename]: ruleFn(dice),
		}));
		setRollsLeft(NUM_ROLLS);
		setLocked(Array(NUM_DICE).fill(false));
		roll();
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
			/>
		</div>
	);
};

export default Game;
