import React from "react";
import "../../Brands.css";

export default function BrandsItem({ _id, title, main, hide, isOpen }) {
	return (
		<>
			<li
				key={_id}
				className="brands-list"
				style={isOpen ? { display: "" } : hide ? { display: "none" } : { display: "" }}
			>
				<span>{title}</span>
				<span>(main: {main.toString()})</span>
			</li>
		</>
	);
}
