import React from "react";

export default function BrandsForm() {
	const handleSubmit = (event) => {
		event.preventDefault();
	};
	return (
		<form onSubmit={handleSubmit}>
			<input type="submit" title="find" />
		</form>
	);
}
