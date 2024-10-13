import React from 'react';
import './Field.css';
const Field = (props) => {
	const fieldClass = props.isActive ? 'field activated' : 'field';
	return (
		<div
			className={fieldClass}
			onClick={props.onClick}
		></div>
	);
};

export default Field;
