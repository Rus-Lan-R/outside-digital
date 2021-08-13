import { addBrandToServer } from "../../../redux/actions/brands.action";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import "../Brands.css";

export default function BrandsForm() {
	const dispatch = useDispatch();

	const [title, setTitle] = useState("");
	const [main, setMain] = useState(true);
	// если создавать с полем main:false появляется ошибка 4222
	// пробовал через Swagger там также
	// Swagger: https://app.swaggerhub.com/apis/K5921/brands/1.0.0-oas3

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(addBrandToServer({ title, main }));
		setMain(false);
		setTitle("");
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className="input-field"
					name="title"
					placeholder="Title"
					required
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<input
					type="checkbox"
					id="main"
					name="main"
					checked={main}
					onChange={() => setMain((prev) => !prev)}
				/>

				<input type="submit" value="add" />
			</form>
		</div>
	);
}
