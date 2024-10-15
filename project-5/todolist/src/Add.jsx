import React from 'react';

const Add = ({ onSubmit }) => {
	return (
		<div>
			<form onSubmit={onSubmit}>
				<label htmlFor="task">Task</label>
				<input
					type="text"
					id="task"
					name="task" // Add name attribute so the value can be accessed
					placeholder="Enter Task"
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default Add;
