import React from 'react';
import Die from './Die';
import './Dice.css';

const Dice = ({ dice, locked, handleClick }) => {
	return (
		<div className="Dice">
			{dice.map((d, idx) => (
				<Die
					key={idx}
					value={d || 1}
					id={String(d)} // Ensure a default value (like 1) if d is undefined
					locked={locked[idx]}
					handleClick={() => handleClick(idx)}
				/>
			))}
		</div>
	);
};

export default Dice;
