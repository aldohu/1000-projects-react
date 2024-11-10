import React from 'react';
import './RuleRow.css';

const RuleRow = ({ name, score, doScore }) => {
	return (
		<tr
			className="RuleRow RuleRow-active"
			onClick={doScore}
		>
			<td className="RuleRow-name">{name}</td>
			<td className="RuleRow-score">{score}</td>
		</tr>
	);
};

export default RuleRow;

// RuleRow.js
