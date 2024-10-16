import React, { useState } from 'react';

const Todo = ({
	todo,
	handleClick,
	setEditingTodoId,
	editingTodoId,
	editTodo,
	handleDelete,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState(todo.text);

	const handleEditClick = () => {
		setIsEditing(true);
		setEditedText(todo.text);
		setEditingTodoId(todo.id);
	};

	const handleSaveClick = (e) => {
		e.stopPropagation();
		if (editedText.trim() !== '') {
			editTodo(todo.id, editedText);
			setIsEditing(false);
		}
	};

	return (
		<div
			onClick={() => handleClick(todo.id)}
			style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
			className={`todo ${todo.isDeleting ? 'todo-fade' : ''}`} // Add fade class
		>
			{!isEditing ? (
				<>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleDelete(todo.id);
						}}
					>
						X
					</button>
					{todo.text}
					<button onClick={handleEditClick}>Edit Todo</button>
				</>
			) : (
				<>
					<input
						type="text"
						value={editedText}
						onChange={(e) => setEditedText(e.target.value)}
					/>
					<button onClick={handleSaveClick}>Save</button>
				</>
			)}
		</div>
	);
};

export default Todo;
