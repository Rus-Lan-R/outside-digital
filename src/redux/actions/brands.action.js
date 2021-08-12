import {
	SET_ALL_BRANDS,
	SET_OUTPUT_BRANDS,
	CHANGE_SORT_TYPE,
	FOLD_CURRENT_BRAND_GROUP,
	FIND_BRAND,
} from "../types/brandsTypes";
import * as endPoints from "../../config/endPoints";
import axios from "axios";

export const getBrandsFromServer = () => (dispatch) => {
	axios
		.get("https://recruting-test-api.herokuapp.com/api/v1/brands")
		.then(({ data }) => {
			const brands = data.map((el) => ({ ...el, hide: false }));

			dispatch(setBrands(brands));
		})
		.catch((error) => {
			console.error(error);
			alert(error);
		});
};

export const setBrands = (brands) => ({
	type: SET_ALL_BRANDS,
	payload: brands,
});

export const setOutputBrands = (brands) => ({
	type: SET_OUTPUT_BRANDS,
	payload: brands,
});

export const foldCurrentBrandGroup = (keyBrendGroup) => ({
	type: FOLD_CURRENT_BRAND_GROUP,
	payload: keyBrendGroup,
});

export const changeSortType = ({ reverse }) => ({
	type: CHANGE_SORT_TYPE,
	payload: reverse,
});

export const findBrand = (findText, checkRegister) => ({
	type: FIND_BRAND,
	payload: { findText, checkRegister },
});
