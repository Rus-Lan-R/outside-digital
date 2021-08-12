import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeSortType, findBrand } from "../../../redux/actions/brands.action";
import "../Brands.css";

export default function BrandsForm() {
	const dispatch = useDispatch();

	// const [inputValue, setInputValue] = useState("");
	const [checkRegister, setCheckRegister] = useState(true);

	const changeFindTetx = (event) => {
		dispatch(findBrand(event.target.value.trim(), checkRegister));
	};

	return (
		<div className="container">
			<input
				type="text"
				title="find"
				className="input-field"
				name="find"
				onChange={changeFindTetx}
				placeholder="Search.."
			/>
			<input
				type="button"
				value="A-Z"
				onClick={() => dispatch(changeSortType({ reverse: true }))}
			/>
			<input
				type="button"
				value="Z-A"
				onClick={() => dispatch(changeSortType({ reverse: false }))}
			/>
			<div>
				<button name="button" onClick={() => setCheckRegister((prev) => !prev)}>
					{checkRegister ? "Aa" : "aa"}
				</button>
				<div>
					{checkRegister
						? "(Поиск с учетом регистра включен)"
						: "(Поиск с учетом регистра выключен)"}
				</div>
			</div>
		</div>
	);
}
