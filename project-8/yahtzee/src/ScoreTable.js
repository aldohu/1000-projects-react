import React from 'react';
import RuleRow from './RuleRow';
import './ScoreTable.css';

const ScoreTable = ({ scores, doScore, totalScore }) => {
	// Mapping rule names from UI to actual function names
	const nameToRuleNameMap = {
		Ones: 'ones',
		Twos: 'twos',
		Threes: 'threes',
		Fours: 'fours',
		Fives: 'fives',
		Sixes: 'sixes',
		'Three of Kind': 'threeOfKind',
		'Four of Kind': 'fourOfKind',
		'Full House': 'fullHouse',
		'Small Straight': 'smallStraight',
		'Large Straight': 'largeStraight',
		Yahtzee: 'yahtzee',
		Chance: 'chance',
	};

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
								doScore={() => doScore(nameToRuleNameMap[name])} // Using the mapping for rule names
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
								doScore={() => doScore(nameToRuleNameMap[name])} // Same mapping for lower section
							/>
						))}
					</tbody>
				</table>
			</section>
			<section className="ScoreTable-section ScoreTable-section-total">
				<h2>Total</h2>
				<p>{totalScore}</p>
			</section>
		</div>
	);
};

export default ScoreTable;
