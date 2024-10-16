import React, { useState } from 'react';

const NewTodoForm = ({ onSubmit }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent default form submission
		if (inputValue.trim()) {
			onSubmit(inputValue); // Call the onSubmit prop with input value
			setInputValue(''); // Clear the input field
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				placeholder="Add a new todo..."
			/>
			<button type="submit">Add Todo</button>
		</form>
	);
};

export default NewTodoForm;
