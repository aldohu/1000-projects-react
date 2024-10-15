import React from 'react';
import Add from './Add';
import './Todo.css';
import Addreactway from './Addreactway';
const Todo = () => {
	const [tasks, setTasks] = React.useState(['Task 1', 'Task 2', 'Task 3']);

	// Handle click to delete task
	const handleTaskClick = (taskToDelete) => {
		setTasks(tasks.filter((task) => task !== taskToDelete));
	};

	// Handle form submit
	const handleSubmit = (event) => {
		event.preventDefault();
		const task = event.target.task.value;
		setTasks([...tasks, task]);
		event.target.reset();
	};
	return (
		<div className="todo">
			<h1>Todo</h1>
			<table>
				<tbody>
					{tasks.map((task, index) => (
						<tr key={index}>
							<th onClick={() => handleTaskClick(task)}>{task}</th>
						</tr>
					))}
				</tbody>
			</table>

			<Addreactway />
		</div>
	);
};

export default Todo;
