import React from 'react';

const Box = ({ color, height, width, handleRemoveBox, key, id }) => {
	return (
		<div
			style={{
				backgroundColor: color,
				height: height + 'px',
				width: width + 'px',
			}}
		>
			<button onClick={() => handleRemoveBox(id)}>Remove</button>
		</div>
	);
};

export default Box;
