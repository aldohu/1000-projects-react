import React from 'react';
import click from './click.wav';
import victory from './victory.wav';
import './Board.css';
import Field from './Field';
import { useState } from 'react';
import Win from './Win';
const Board = () => {
	const rows = 4; // Number of rows
	const cols = 4; // Number of columns
	const clickSound = new Audio(click);
	const victorySound = new Audio(victory);
	const initialActiveState = Array.from({ length: rows }, () =>
		Array(cols).fill(true),
	); // Initialize all fields as active
	const [isActive, setActive] = useState(initialActiveState);
	const [isGameOver, setIsGameOver] = useState(false);
	const checkGameOver = (newActive) => {
		// Check if all fields are inactive (or you could check for another condition)
		const allInactive = newActive.every((row) => row.every((cell) => !cell));
		return allInactive;
	};
	const handleClick = (row, col) => {
		setActive((prevActive) => {
			const newActive = prevActive.map((arr) => arr.slice()); // Deep copy the state to avoid mutating the original state
			newActive[row][col] = !newActive[row][col];
			const adjacentPositions = [
				// The clicked field
				[row - 1, col], // Up
				[row + 1, col], // Down
				[row, col - 1], // Left
				[row, col + 1], // Right
			];
			adjacentPositions.forEach(([r, c]) => {
				if (r >= 0 && r < rows && c >= 0 && c < cols) {
					newActive[r][c] = !newActive[r][c];
				}
			});
			if (checkGameOver(newActive)) {
				setIsGameOver(true);
				victorySound.play();
			}
			clickSound.play();
			return newActive;
		});
	};

	return (
		<>
			{isGameOver ? (
				<Win /> // Render the Win component if the game is over
			) : (
				<div className="board">
					{isActive.map((row, rowIndex) => (
						<div
							key={rowIndex}
							className="row"
						>
							{row.map((active, colIndex) => (
								<div
									key={colIndex}
									className="cell"
								>
									<Field
										onClick={() => handleClick(rowIndex, colIndex)}
										isActive={active}
									/>
								</div>
							))}
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default Board;
