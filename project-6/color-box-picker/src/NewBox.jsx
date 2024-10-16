import React from 'react';
import { uid } from 'uid';
import './NewBox.css';
const NewBox = (props) => {
	const [box, setBox] = React.useState({ width: '', height: '', color: '' });
	const handleSubmit = (event) => {
		event.preventDefault();

		// Create new box from form inputs
		const newBox = {
			id: uid(), // Generate a unique ID
			width: event.target.width.value,
			height: event.target.height.value,
			color: event.target.color.value,
		};

		// Clear the form fields
		event.target.width.value = '';
		event.target.height.value = '';
		event.target.color.value = '';

		// Update the boxes state in the parent component
		props.setBoxes((boxes) => [...boxes, newBox]);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="NewBox"
		>
			<label htmlFor="width">
				Width:
				<input
					id="width"
					type="text"
					name="width"
					required
				/>
			</label>
			<label htmlFor="height">
				Height:
				<input
					id="height"
					type="text"
					name="height"
					required
				/>
			</label>
			<label htmlFor="color">
				Color:
				<input
					id="color"
					type="color"
					name="color"
					required
				/>
			</label>
			<button type="submit">Add Box</button>
		</form>
	);
};

export default NewBox;
