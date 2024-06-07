import React from "react";

import "./ColorTheme.scss";
const colors = ["#6b2fef", "yellow", "red", "orange", "green"];

const ColorTheme = ({ selectedColor, setSelectedColor }) => {
	return (
		<div className="colors-container">
			{colors.map((c) => (
				<label
					key={c}
					style={{ background: c, "--c": c }}
					onClick={() => {
						setSelectedColor(c);
					}}
				>
					<input
						type="radio"
						name="color"
						id={c}
						checked={selectedColor === c}
						onChange={() => setSelectedColor(selectedColor)}
					/>
				</label>
			))}
		</div>
	);
};

export default ColorTheme;
