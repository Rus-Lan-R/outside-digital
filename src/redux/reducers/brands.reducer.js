import {
	CHANGE_SORT_TYPE,
	SET_OUTPUT_BRANDS,
	SET_ALL_BRANDS,
	FOLD_CURRENT_BRAND_GROUP,
	FIND_BRAND,
} from "../types/brandsTypes";

const brandsReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case SET_ALL_BRANDS:
			const sortedArrayBrands = sortArray(payload, "title", false);
			const groupedBrands = groupBrandsByFirstChar(sortedArrayBrands);
			const updatetdBrandsList = groupedBrands.map((el) => [...el, { isOpen: false }]);
			console.log(updatetdBrandsList);

			updatetdBrandsList.forEach((el) => {
				if (el[1].some((el) => el.main)) {
					let countTrue = 0;
					el[1].forEach((el) => {
						if (el.main && countTrue++ < 5) {
							el.hide = false;
						} else {
							el.hide = true;
						}
					});
				} else {
					console.log(el[1]);
					return el[1].forEach((_, index) => (index < 5 ? (el.hide = true) : (el.hide = false)));
				}
			});
			console.log(groupedBrands);

			return groupedBrands;

		case FOLD_CURRENT_BRAND_GROUP: {
			let copyBrands = [...state];

			copyBrands.forEach((el) => {
				if (el[0] === payload) {
					el[2] = !el[2];
				}
			});

			return copyBrands;
		}

		case CHANGE_SORT_TYPE: {
			return { ...state };
		}

		case FIND_BRAND: {
			const { findText, checkRegister } = payload;

			let matchBrands = {};

			for (let key in state.allBrands) {
				const arraOfMatch = state.allBrands[key].filter((el) => {
					if (checkRegister) {
						return el.title.match(findText) && el;
					} else {
						return el.title.toLowerCase().match(findText.toLowerCase()) && el;
					}
				});
				if (arraOfMatch.length) matchBrands[key] = arraOfMatch; // если есть совпадения в названиях, то добавляем в стейт
			}
			return { ...state, outputBrands: matchBrands };
		}

		default:
			return state;
	}
};

const groupBrandsByFirstChar = (array) => {
	const groupBrandsObj = array.reduce((el, current) => {
		el[current.title.charAt(0).toLowerCase()]
			? el[current.title.charAt(0).toLowerCase()].push(current)
			: (el[current.title.charAt(0).toLowerCase()] = [current]);

		return el;
	}, {});

	return Object.entries(groupBrandsObj);
};

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

const sortArray = (array, key, reverse) => {
	let sortOrder = 1;
	if (reverse) sortOrder = -1;

	let sortedArray = array.sort((a, b) => {
		let x = a[key].toLowerCase();
		let y = b[key].toLowerCase();

		return sortOrder * (x < y ? -1 : x > y ? 1 : 0);
	});
	return sortedArray;
};

// const grouppedBrends = groupBrandsByFirstChar(data);

// Функция (groupBrandsByFirstChar) группирует массив объектов по первой букве в парметре по ключю title,
// и возвращает  объект, где ключ - это первая буква сгруппированных заголовков, а занчение - это массив объектов данных брендов
// {A: [{_id: 1, title: adskds, main:true}, {_id: 1, title: Ajskdjsk, main:false}]}
// dispatch(setBrands(grouppedBrends));

// const sortedBrands = intialSortBrands(grouppedBrends);
// dispatch(setOutputBrands(sortedBrands));
// Функция которая сортирует объект по двум ключам сначала по ключу main, а затем по ключу title по алфавиту
export default brandsReducer;
