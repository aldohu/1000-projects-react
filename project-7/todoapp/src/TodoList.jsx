import React, { useState } from 'react';
import { uid } from 'uid';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';

const TodoList = () => {
	const [todos, setTodos] = useState([
		{ text: 'Learn about React', isCompleted: false, id: uid() },
		{ text: 'Meet friend for lunch', isCompleted: false, id: uid() },
		{ text: 'Build really cool todo app', isCompleted: false, id: uid() },
	]);

	const [editingTodoId, setEditingTodoId] = useState(null);

	const handleClick = (id) => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, isCompleted: !todo.isCompleted };
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const addTodo = (text) => {
		const newTodo = { text, isCompleted: false, id: uid() };
		setTodos([...todos, newTodo]);
	};

	const editTodo = (id, newText) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, text: newText };
			}
			return todo;
		});
		setTodos(updatedTodos);
		setEditingTodoId(null);
	};

	// New handleDelete with fade-out animation
	const handleDelete = (id) => {
		// Mark todo as deleting
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, isDeleting: true }; // Set isDeleting flag
			}
			return todo;
		});
		setTodos(updatedTodos);

		// Remove todo after the fade-out effect
		setTimeout(() => {
			const remainingTodos = todos.filter((todo) => todo.id !== id);
			setTodos(remainingTodos);
		}, 300); // Match duration with CSS animation
	};

	return (
		<div className="TodoList">
			{todos.map((todo) => (
				<Todo
					key={todo.id}
					todo={todo}
					handleClick={handleClick}
					editingTodoId={editingTodoId}
					setEditingTodoId={setEditingTodoId}
					editTodo={editTodo}
					handleDelete={handleDelete}
				/>
			))}
			<NewTodoForm onSubmit={addTodo} />
		</div>
	);
};

export default TodoList;
