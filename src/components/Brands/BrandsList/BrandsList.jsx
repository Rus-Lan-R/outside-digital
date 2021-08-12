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
	const brands = useSelector((state) => state.brands);

	return (
		<div className="container">
			{brands.length ? (
				<>
					{brands.map((el) => (
						<ul>
							<div className>
								"{el[0]}" Колиество {el[1].length}
								<input
									type="button"
									value={el[2] ? "<<" : ">>"}
									onClick={() => dispatch(foldCurrentBrandGroup(el[0]))}
								/>
							</div>
							{el[1].map((brand) => (
								<BrandsItem {...brand} isOpen={el[2]} />
							))}
						</ul>
					))}
				</>
			) : (
				<div>Ничего не найдено</div>
			)}
		</div>
	);
}
