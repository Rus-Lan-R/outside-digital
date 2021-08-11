import { SET_BRANDS } from "../types/brandsTypes";
import * as endPoints from "../../config/endPoints";
import axios from "axios";

const intialSortBrands = (obj) => {
	const sortedObj = {};
	for (let key in obj) {
		sortedObj[key] = obj[key].sort((a, b) => {
			if (a.main !== b.main) {
				return b.main - a.main;
			} else {
				return a.title.localeCompare(b, undefined, { sensitivity: "base" });
			}
		});
	}
	return sortedObj;
};

const groupBrandsByFirstChar = (array) =>
	array.reduce((el, current) => {
		el[current.title.charAt(0).toUpperCase()]
			? el[current.title.charAt(0).toUpperCase()].push(current)
			: (el[current.title.charAt(0).toUpperCase()] = [current]);

		return el;
	}, {}); // function

export const getBrandsFromServer = () => (dispatch) => {
	axios
		.get("https://recruting-test-api.herokuapp.com/api/v1/brands")
		.then(({ data }) => {
			console.log("ask");
			const grouppedBrends = groupBrandsByFirstChar(data);
			// Функция (groupBrandsByFirstChar) группирует массив объектов по первой букве в парметре по ключю title,
			// и возвращает  объект, где ключ - это первая буква сгруппированных заголовков, а занчение - это массив объектов данных брендов
			// {A: [{_id: 1, title: adskds, main:true}, {_id: 1, title: Ajskdjsk, main:false}]}
			const sortedBrands = intialSortBrands(grouppedBrends);
			// Функция которая сортирует объект по двум ключам сначала по ключу main, а затем по ключу title по алфавиту
			dispatch(setBrands(sortedBrands));
		})
		.catch((error) => {
			console.error(error);
			alert(error);
		});
};

export const setBrands = (brands) => ({
	type: SET_BRANDS,
	payload: brands,
});
