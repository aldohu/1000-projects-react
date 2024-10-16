import React from 'react';

const Todo = ({ todo, index, handleClick }) => {
	return (
		<div
			onClick={() => handleClick(index)}
			style={{
				textDecoration: todo.isCompleted ? 'line-through' : 'none', // Directly access isCompleted
			}}
		>
			{todo.text}
		</div>
	);
};

export default Todo;
