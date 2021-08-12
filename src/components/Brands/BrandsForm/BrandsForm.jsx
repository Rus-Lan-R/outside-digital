import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reverseSort, findBrand } from "../../../redux/actions/brands.action";
import "../Brands.css";

export default function BrandsForm() {
	const dispatch = useDispatch();
	const [checkRegister, setCheckRegister] = useState(false);

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
			<input type="button" value="A-Z" onClick={() => dispatch(reverseSort({ reverse: false }))} />
			<input type="button" value="Z-A" onClick={() => dispatch(reverseSort({ reverse: true }))} />
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
