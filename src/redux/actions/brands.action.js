import {
	SET_ALL_BRANDS,
	REVERSE_BRANDS_SORT,
	FOLD_CURRENT_BRAND_GROUP,
	SEARCH_BRANDS,
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

export const foldCurrentBrandGroup = (keyBrendGroup) => ({
	type: FOLD_CURRENT_BRAND_GROUP,
	payload: keyBrendGroup,
});

export const reverseSort = ({ reverse }) => ({
	type: REVERSE_BRANDS_SORT,
	payload: reverse,
});

export const findBrand = (findText, checkRegister) => ({
	type: SEARCH_BRANDS,
	payload: { findText, checkRegister },
});
