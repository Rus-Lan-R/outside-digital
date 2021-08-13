import React from "react";
import { useDispatch } from "react-redux";
import "../../Brands.css";
import {
	deleteBrandFromServer,
	updateBrandOnServer,
} from "../../../../redux/actions/brands.action";

export default function BrandsItem({ _id, title, main, hide, isOpen }) {
	const dispatch = useDispatch();
	return (
		<>
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
								dispatch(updateBrandOnServer(_id));
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
