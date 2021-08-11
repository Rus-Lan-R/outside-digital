import React from "react";

export default function BrandsItem({ brandsGroup, isTrue }) {
	return (
		<>
			{isTrue
				? brandsGroup.map(
						(el) =>
							el.main && (
								<li key={el._id}>
									<span>{el.title}</span>
									<span>(main: {el.main.toString()})</span>
								</li>
							),
				  )
				: brandsGroup.map(
						(el, index) =>
							index < 5 && (
								<li key={el._id}>
									{" "}
									<span>{el.title}</span>
									<span>(main: {el.main.toString()})</span>
								</li>
							),
				  )}
		</>
	);
}
