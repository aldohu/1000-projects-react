import React from 'react';
import './NewTodoForm.css';
const NewTodoForm = (props) => {
	const [newTodoText, setNewTodoText] = React.useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		// Update todos
		props.setTodos([
			...props.todos,
			{
				text: newTodoText,
				isCompleted: false,
			},
		]);

		// Clear the input field after submission
		setNewTodoText('');
	};

	return (
		<div className="NewTodoForm">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={newTodoText} // Controlled input
					onChange={(e) => setNewTodoText(e.target.value)}
				/>
				<button type="submit">Add a new todo</button>
			</form>
		</div>
	);
};

export default NewTodoForm;
