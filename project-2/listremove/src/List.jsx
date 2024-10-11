import React from 'react';

const List = (props) => {
	return (
		<div>
			<div
				className="item"
				onClick={props.onClick}
			>
				List{props.item}
			</div>
			<button
				onClick={props.onClick}
				item={props.item}
			>
				Remove
			</button>
		</div>
	);
};

export default List;
