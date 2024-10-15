import React from 'react';

const Addreactway = () => {
	const [name, setName] = React.useState('');
	const [qty, setQty] = React.useState('');
	const onChange = (event) => {
		event.preventDefault();
		const { name: inputName, value } = event.target; // Destructure name and value
		if (inputName === 'name') {
			setName(value); // Update name state
		} else if (inputName === 'qty') {
			setQty(value); // Update qty state
		}
	};
	return (
		<div>
			<form>
				<label htmlFor="name">Name of task</label>
				<input
					type="text"
					id="name"
					name="name" // Add name attribute so the value can be accessed
					placeholder="Enter Name of Task"
					value={name}
					onChange={onChange}
				/>
				<label htmlFor="qty">Quantity</label>
				<input
					value={qty}
					type="text"
					id="qty"
					name="qty"
					onChange={onChange}
					placeholder="Enter Quantity"
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default Addreactway;
