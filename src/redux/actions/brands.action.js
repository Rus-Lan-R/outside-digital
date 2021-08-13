import {
	SET_ALL_BRANDS,
	REVERSE_BRANDS_SORT,
	FOLD_CURRENT_BRAND_GROUP,
	SEARCH_BRANDS,
	DELETE_BRANDS,
	ADD_NEW_BRAND,
	UPDATE_BRAND,
} from "../types/brandsTypes";
import * as endPoints from "../../config/endPoints";

export const getBrandsFromServer = () => async (dispatch) => {
	try {
		const response = await fetch(endPoints.getBrandsApi());

		if (response.ok) {
			//если ответ от сервера 2хх то изменяем стейт
			const data = await response.json();

			const brands = data.map((el) => ({ ...el, hide: false })); //hide:false нужен для отображения в short view
			dispatch(setBrands(brands));
		} else alert(`ERROR - ${response.status}`);
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
			//если ответ от сервера 2хх то изменяем стейт
			const newBrand = await response.json();
			dispatch(addNewBrand(newBrand));
		} else alert(`ERROR - ${response.status}`);
	} catch (error) {
		console.error(error);
		alert(error);
	}
};

export const updateBrandOnServer = (payload) => async (dispatch) => {
	try {
		const response = await fetch(endPoints.updateBrandApi(payload._id), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		if (response.ok) {
			//если ответ от сервера 2хх то изменяем стейт
			dispatch(updateBrand(payload));
		} else alert(`ERROR - ${response.status}`);
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
			//если ответ от сервера 2хх то изменяем стейт
			dispatch(deleteBrand(_id));
		} else alert(`ERROR - ${response.status}`);
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

export const updateBrand = (payload) => ({
	type: UPDATE_BRAND,
	payload,
});

export const deleteBrand = (_id) => ({
	type: DELETE_BRANDS,
	payload: _id,
});
export const foldCurrentBrandGroup = (keyBrandGroup) => ({
	type: FOLD_CURRENT_BRAND_GROUP,
	payload: keyBrandGroup, //первая буква группы массива объектов которые надо развернуть или свернуть
});

export const reverseSort = ({ reverse }) => ({
	type: REVERSE_BRANDS_SORT,
	payload: reverse,
});

export const findBrand = (findText, checkRegister) => ({
	type: SEARCH_BRANDS,
	payload: { findText, checkRegister },
});
