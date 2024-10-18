import React from 'react';
import RuleRow from './RuleRow';
import './ScoreTable.css';

const ScoreTable = ({ scores, doScore }) => {
	// Upper Section
	const upperSection = [
		{ name: 'Ones', score: scores.ones },
		{ name: 'Twos', score: scores.twos },
		{ name: 'Threes', score: scores.threes },
		{ name: 'Fours', score: scores.fours },
		{ name: 'Fives', score: scores.fives },
		{ name: 'Sixes', score: scores.sixes },
	];

	// Lower Section
	const lowerSection = [
		{ name: 'Three of Kind', score: scores.threeOfKind },
		{ name: 'Four of Kind', score: scores.fourOfKind },
		{ name: 'Full House', score: scores.fullHouse },
		{ name: 'Small Straight', score: scores.smallStraight },
		{ name: 'Large Straight', score: scores.largeStraight },
		{ name: 'Yahtzee', score: scores.yahtzee },
		{ name: 'Chance', score: scores.chance },
	];

	return (
		<div className="ScoreTable">
			<section className="ScoreTable-section">
				<h2>Upper</h2>
				<table cellSpacing="0">
					<tbody>
						{upperSection.map(({ name, score }) => (
							<RuleRow
								key={name}
								name={name}
								score={score}
								doScore={() => doScore(name.toLowerCase())}
							/>
						))}
					</tbody>
				</table>
			</section>
			<section className="ScoreTable-section ScoreTable-section-lower">
				<h2>Lower</h2>
				<table cellSpacing="0">
					<tbody>
						{lowerSection.map(({ name, score }) => (
							<RuleRow
								key={name}
								name={name}
								score={score}
								doScore={() => doScore(name.replace(/\s+/g, '').toLowerCase())}
							/>
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
};

export default ScoreTable;
