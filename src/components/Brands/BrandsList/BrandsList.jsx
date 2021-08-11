import React, { useEffect, useState } from "react";
import BrandsItem from "./BrandsItem/BrandsItem";
import { useDispatch, useSelector } from "react-redux";

import { getBrandsFromServer } from "../../../redux/actions/brands.action";

export default function BrandsList() {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("sls");
		dispatch(getBrandsFromServer());
	}, []);
	const brands = useSelector((state) => state.brands);

	// const intialSortBrands = (obj) => {
	// 	const sortedObj = {};
	// 	for (let key in obj) {
	// 		// let countTrueValues = 0;
	// 		sortedObj[key] = obj[key].sort((a, b) => {
	// 			if (a.main !== b.main) {
	// 				return b.main - a.main;
	// 			} else {
	// 				return a.title.localeCompare(b, undefined, { sensitivity: "base" });
	// 			}
	// 		});
	// 	}
	// 	return sortedObj;
	// };

	// const groupBrandsByFirstChar = (array) =>
	// 	array.reduce((el, current) => {
	// 		el[current.title.charAt(0).toUpperCase()]
	// 			? el[current.title.charAt(0).toUpperCase()].push(current)
	// 			: // : (el[current.title.charAt(0).toUpperCase()] = [current]);
	// 			  (el[current.title.charAt(0).toUpperCase()] = [current]);

	// 		return el;
	// 	}, {}); // function

	return (
		<div>
			{Object.keys(brands).map((el) => (
				<>
					<ul>
						<div>
							{el} ({brands[el].length})
						</div>
						{brands[el].some((el) => el.main) ? (
							<BrandsItem brandsGroup={brands[el]} isTrue={true} />
						) : (
							<BrandsItem brandsGroup={brands[el]} isTrue={false} />
						)}
					</ul>
				</>
			))}
		</div>
	);
}
