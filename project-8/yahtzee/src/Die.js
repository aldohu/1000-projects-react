import React from 'react';
import './Die.css';

const Die = ({ id, locked, handleClick }) => {
	const size = 40; // Set the size of the die

	const renderSvg = () => {
		if (id === '1') {
			return (
				<svg
					width={size}
					height={size}
					viewBox="0 0 50 50"
				>
					<rect
						width="50"
						height="50"
						rx="5"
						fill="white"
						stroke="black"
					/>
					<circle
						cx="25"
						cy="25"
						r="5"
						fill="black"
					/>
				</svg>
			);
		} else if (id === '2') {
			return (
				<svg
					width={size}
					height={size}
					viewBox="0 0 50 50"
				>
					<rect
						width="50"
						height="50"
						rx="5"
						fill="white"
						stroke="black"
					/>
					<circle
						cx="15"
						cy="15"
						r="5"
						fill="black"
					/>
					<circle
						cx="35"
						cy="35"
						r="5"
						fill="black"
					/>
				</svg>
			);
		} else if (id === '3') {
			return (
				<svg
					width={size}
					height={size}
					viewBox="0 0 50 50"
				>
					<rect
						width="50"
						height="50"
						rx="5"
						fill="white"
						stroke="black"
					/>
					<circle
						cx="15"
						cy="15"
						r="5"
						fill="black"
					/>
					<circle
						cx="25"
						cy="25"
						r="5"
						fill="black"
					/>
					<circle
						cx="35"
						cy="35"
						r="5"
						fill="black"
					/>
				</svg>
			);
		} else if (id === '4') {
			return (
				<svg
					width={size}
					height={size}
					viewBox="0 0 50 50"
				>
					<rect
						width="50"
						height="50"
						rx="5"
						fill="white"
						stroke="black"
					/>
					<circle
						cx="15"
						cy="15"
						r="5"
						fill="black"
					/>
					<circle
						cx="15"
						cy="35"
						r="5"
						fill="black"
					/>
					<circle
						cx="35"
						cy="15"
						r="5"
						fill="black"
					/>
					<circle
						cx="35"
						cy="35"
						r="5"
						fill="black"
					/>
				</svg>
			);
		} else if (id === '5') {
			return (
				<svg
					width={size}
					height={size}
					viewBox="0 0 50 50"
				>
					<rect
						width="50"
						height="50"
						rx="5"
						fill="white"
						stroke="black"
					/>
					<circle
						cx="15"
						cy="15"
						r="5"
						fill="black"
					/>
					<circle
						cx="15"
						cy="35"
						r="5"
						fill="black"
					/>
					<circle
						cx="25"
						cy="25"
						r="5"
						fill="black"
					/>
					<circle
						cx="35"
						cy="15"
						r="5"
						fill="black"
					/>
					<circle
						cx="35"
						cy="35"
						r="5"
						fill="black"
					/>
				</svg>
			);
		} else if (id === '6') {
			return (
				<svg
					width={size}
					height={size}
					viewBox="0 0 50 50"
				>
					<rect
						width="50"
						height="50"
						rx="5"
						fill="white"
						stroke="black"
					/>
					<circle
						cx="15"
						cy="15"
						r="5"
						fill="black"
					/>
					<circle
						cx="15"
						cy="25"
						r="5"
						fill="black"
					/>
					<circle
						cx="15"
						cy="35"
						r="5"
						fill="black"
					/>
					<circle
						cx="35"
						cy="15"
						r="5"
						fill="black"
					/>
					<circle
						cx="35"
						cy="25"
						r="5"
						fill="black"
					/>
					<circle
						cx="35"
						cy="35"
						r="5"
						fill="black"
					/>
				</svg>
			);
		} else {
			return null; // If the id doesn't match, return null
		}
	};

	return (
		<div
			className={`Die ${locked ? 'Die-locked' : ''}`}
			style={{ backgroundColor: locked ? 'darkgrey' : 'black' }}
			onClick={() => handleClick(id)}
		>
			{renderSvg()}
		</div>
	);
};

export default Die;
