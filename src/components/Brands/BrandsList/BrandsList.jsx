import "../Brands.css";
import React, { useEffect } from "react";
import BrandsItem from "./BrandsItem/BrandsItem";
import { useDispatch, useSelector } from "react-redux";

import { getBrandsFromServer, foldCurrentBrandGroup } from "../../../redux/actions/brands.action";

export default function BrandsList() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBrandsFromServer());
	}, []);
	const brands = useSelector((state) => state.brands?.outputBrands);
	const allBrands = useSelector((state) => state.brands?.allBrands);

	return (
		<>
			{Object.keys(brands).length ? (
				Object.keys(brands)?.map(
					(el) =>
						brands[el].length > 0 && (
							<div className="container">
								<ul>
									<div>
										{el} ({allBrands[el]?.length})
										<input
											type="button"
											value=">>"
											onClick={() => dispatch(foldCurrentBrandGroup(el))}
										/>
									</div>
									<BrandsItem brandsGroup={brands[el]} />
								</ul>
							</div>
						),
				)
			) : (
				<p>Ничего не найдено</p>
			)}
		</>
	);
}
