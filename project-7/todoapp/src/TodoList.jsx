import React from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import './TodoList.css';

const TodoList = () => {
	const [todos, setTodos] = React.useState([
		{ text: 'Learn about React', isCompleted: false },
		{ text: 'Meet friend for lunch', isCompleted: false },
		{ text: 'Build really cool todo app', isCompleted: false },
	]);

	const handleClick = (index) => {
		const newTodos = todos.map((todo, i) => {
			if (i === index) {
				return { ...todo, isCompleted: !todo.isCompleted };
			}
			return todo;
		});
		setTodos(newTodos);
	};

	return (
		<div className="TodoList">
			{todos.map((todo, index) => (
				<Todo
					key={index}
					index={index}
					todo={todo}
					handleClick={handleClick}
				/>
			))}
			<NewTodoForm
				todos={todos}
				setTodos={setTodos}
			/>
		</div>
	);
};

export default TodoList;
