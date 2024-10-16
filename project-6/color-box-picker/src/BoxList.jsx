import React from 'react';
import './BoxList.css';
import Box from './Box';
import NewBox from './NewBox';
import { uid } from 'uid';
const BoxList = () => {
	const [boxes, setBoxes] = React.useState([]);

	const handleRemoveBox = (id) => {
		setBoxes(boxes.filter((box) => box.id !== id));
	};
	return (
		<div className="BoxList">
			<h1>Box List</h1>
			{boxes.map((box) => (
				<Box
					key={box.id}
					{...box}
					id={box.id}
					color={box.color}
					handleRemoveBox={handleRemoveBox}
				/>
			))}

			<NewBox
				setBoxes={setBoxes}
				handleRemoveBox={handleRemoveBox}
			/>
		</div>
	);
};

export default BoxList;
