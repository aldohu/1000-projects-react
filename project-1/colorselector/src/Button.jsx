import React from 'react';
import './Button.css';
const Button = (prop) => {
	return (
		<div
			className="button"
			style={{ backgroundColor: prop.color }}
			onClick={prop.onClick}
		>
			Button
		</div>
	);
};

export default Button;
