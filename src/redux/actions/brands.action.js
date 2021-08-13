import {
	SET_ALL_BRANDS,
	REVERSE_BRANDS_SORT,
	FOLD_CURRENT_BRAND_GROUP,
	SEARCH_BRANDS,
	DELETE_BRANDS,
	ADD_NEW_BRAND,
} from "../types/brandsTypes";
import * as endPoints from "../../config/endPoints";

export const getBrandsFromServer = () => async (dispatch) => {
	try {
		const response = await fetch(endPoints.getBrandsApi());

		if (response.ok) {
			const data = await response.json();

			const brands = data.map((el) => ({ ...el, hide: false }));
			dispatch(setBrands(brands));
		}
	} catch (error) {
		console.error(error);
		alert(error);
	}
};

export const addBrandToServer = (payload) => async (dispatch) => {
	try {
		const response = await fetch(endPoints.addBrandApi(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (response.ok) {
			const newBrand = await response.json();
			dispatch(addNewBrand(newBrand));
		}
	} catch (error) {
		console.error(error);
		alert(error);
	}
};

export const updateBrandOnServer = (_id, payload) => async (dispatch) => {
	try {
		const response = await fetch(endPoints.updateBrandApi(_id), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (response.ok) {
			dispatch(deleteBrand(_id));
		}
	} catch (error) {
		console.error(error);
		alert(error);
	}
};

export const deleteBrandFromServer = (_id) => async (dispatch) => {
	try {
		const response = await fetch(endPoints.deleteBrandApi(_id), {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			dispatch(deleteBrand(_id));
		}
	} catch (error) {
		console.error(error);
		alert(error);
	}
};

export const setBrands = (brands) => ({
	type: SET_ALL_BRANDS,
	payload: brands,
});

export const addNewBrand = (newBrand) => ({
	type: ADD_NEW_BRAND,
	payload: newBrand,
});

export const deleteBrand = (_id) => ({
	type: DELETE_BRANDS,
	payload: _id,
});
export const foldCurrentBrandGroup = (keyBrandGroup) => ({
	type: FOLD_CURRENT_BRAND_GROUP,
	payload: keyBrandGroup,
});

export const reverseSort = ({ reverse }) => ({
	type: REVERSE_BRANDS_SORT,
	payload: reverse,
});

export const findBrand = (findText, checkRegister) => ({
	type: SEARCH_BRANDS,
	payload: { findText, checkRegister },
});
