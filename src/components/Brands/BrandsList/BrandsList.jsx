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
		<>
			{brands.map((el) => (
				<>
					<ul>
						<div>
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
					{el[2] || <div>...</div>}
				</>
			))}
		</>
	);
}

// {Object.keys(brands).length ? (
//   Object.keys(brands)?.map(
//     (el) =>
//       brands[el].length > 0 && (
//         <div className="container">
//           <ul>
//             <div>
//               {el} ({allBrands[el]?.length})
// <input
//   type="button"
//   value=">>"
//   onClick={() => dispatch(foldCurrentBrandGroup(el))}
//               />
//             </div>
//             <BrandsItem brandsGroup={brands[el]} />
//           </ul>
//         </div>
//       ),
//   )
// ) : (
//   <p>Ничего не найдено</p>
// )}
