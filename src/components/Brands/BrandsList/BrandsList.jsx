import "../Brands.css";
import React, { useEffect } from "react";
import BrandsItem from "./BrandsItem/BrandsItem";
import { useDispatch, useSelector } from "react-redux";
import { reverseSort } from "../../../redux/actions/brands.action";
import { getBrandsFromServer, foldCurrentBrandGroup } from "../../../redux/actions/brands.action";

export default function BrandsList() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBrandsFromServer());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const brands = useSelector((state) => state.brands);

	return (
		<div className="container">
			<input type="button" value="A-Z" onClick={() => dispatch(reverseSort({ reverse: false }))} />
			<input type="button" value="Z-A" onClick={() => dispatch(reverseSort({ reverse: true }))} />
			{brands.length ? (
				<>
					{brands.map((group, index) => (
						<ul key={index}>
							<div>
								[{group[0]}] Колиество {group[1].length}
								<input
									type="button"
									value={group[2].isOpen ? "<<" : ">>"}
									onClick={() => dispatch(foldCurrentBrandGroup(group[0]))}
								/>
							</div>
							{group[1].map((brand) => (
								<BrandsItem key={brand._id} {...brand} {...group[2]} />
							))}
						</ul>
					))}
				</>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
}
