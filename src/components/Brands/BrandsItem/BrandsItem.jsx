import React from "react";
import { useDispatch } from "react-redux";
import "../Brands.css";
import { deleteBrandFromServer, updateBrandOnServer } from "../../../redux/actions/brands.action";
import { useState } from "react";

export default function BrandsItem({ _id, title, main, hide, isOpen }, onChange) {
	const dispatch = useDispatch();
	const [openForm, setOpenFrom] = useState(false);
	const [updatedTitle, setUpdatedTitle] = useState(title);
	const [updatedMain, setUpdatedMain] = useState(main);

	const handleSubmit = (event, _id) => {
		event.preventDefault();

		dispatch(updateBrandOnServer({ _id, title: updatedTitle, main: updatedMain }));
		setOpenFrom(false);
	};

	return (
		<>
			{openForm && (
				<form onSubmit={(event) => handleSubmit(event, _id)}>
					<input
						type="text"
						className="input-field"
						name="title"
						placeholder="Title"
						required
						value={updatedTitle}
						onChange={(event) => setUpdatedTitle(event.target.value)}
					/>
					<input
						type="checkbox"
						id="main"
						name="main"
						checked={updatedMain}
						onChange={() => setUpdatedMain((prev) => !prev)}
					/>

					<input type="submit" value="update" />
				</form>
			)}
			<li
				key={_id}
				className="brands-list"
				style={
					isOpen ? { display: "inherit" } : hide ? { display: "none" } : { display: "inherit" }
				}
			>
				<div>
					<span>{title}</span>
					<span>(main: {main.toString()})</span>
					<span>
						<button
							onClick={() => {
								dispatch(deleteBrandFromServer(_id));
							}}
						>
							delete
						</button>
					</span>

					<span>
						<button
							onClick={() => {
								setOpenFrom((prev) => !prev);
							}}
						>
							edit
						</button>
					</span>
				</div>
			</li>
		</>
	);
}
