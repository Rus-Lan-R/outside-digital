import React from "react";
import "../../Brands.css";

export default function BrandsItem({ brandsGroup }) {
	return (
		<>
			{brandsGroup.map((el, index) => (
				<li key={el._id} className="brands-list">
					<span>{el.title}</span>
					<span>(main: {el.main.toString()})</span>
				</li>
			))}
		</>
	);
}
