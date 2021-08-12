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
			data.forEach((el) => ({ ...el, hide: false }));
			// const grouppedBrends = groupBrandsByFirstChar(data);

			// Функция (groupBrandsByFirstChar) группирует массив объектов по первой букве в парметре по ключю title,
			// и возвращает  объект, где ключ - это первая буква сгруппированных заголовков, а занчение - это массив объектов данных брендов
			// {A: [{_id: 1, title: adskds, main:true}, {_id: 1, title: Ajskdjsk, main:false}]}
			// dispatch(setBrands(grouppedBrends));

			// const sortedBrands = intialSortBrands(grouppedBrends);
			// dispatch(setOutputBrands(sortedBrands));
			// Функция которая сортирует объект по двум ключам сначала по ключу main, а затем по ключу title по алфавиту
		})
		.catch((error) => {
			console.error(error);
			alert(error);
		});
};

const groupBrandsByFirstChar = (array) =>
	array.reduce((el, current) => {
		el[current.title.charAt(0).toLowerCase()]
			? el[current.title.charAt(0).toLowerCase()].push(current)
			: (el[current.title.charAt(0).toLowerCase()] = [current]);

		return el;
	}, {}); // function

// const keysrt = (arr, keyArr, reverse) => {
// 	let sortOrder = 1;
// 	if (reverse) sortOrder = -1;
// 	return arr.sort( (a, b) => {
// 		var x = a,
// 			y = b;
// 		for (var i = 0; i < keyArr.length; i++) {
// 			x = x[keyArr[i]];
// 			y = y[keyArr[i]];
// 		}
// 		return sortOrder * (x < y ? -1 : x > y ? 1 : 0);
// 	});
// }

const intialSortBrands = (obj) => {
	const sortedObj = {};
	for (let key in obj) {
		let sortedArray = obj[key].sort((a, b) => {
			if (a.main !== b.main) {
				return b.main - a.main;
			} else {
				return a.title.localeCompare(b, undefined, { sensitivity: "base" });
			}
		});
		if (sortedArray.some((el) => el.main)) {
			sortedObj[key] = sortedArray.filter((el, index) => el.main && index < 5); // если в массиве объектов нет ни одного парметра main со значением false то формируме массив из пяти элементов
		} else {
			sortedObj[key] = sortedArray.filter((_, index) => index < 5); //если в массиве объектов есть хоть один элемент с параметр main со значением true  то формируем массив этих элементов
		}
	}
	return sortedObj;
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
