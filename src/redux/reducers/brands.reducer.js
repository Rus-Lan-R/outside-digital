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
			return { ...state, allBrands: payload };

		case SET_OUTPUT_BRANDS:
			return { ...state, outputBrands: payload };

		case FOLD_CURRENT_BRAND_GROUP: {
			const keyBrendGroup = payload;
			let updatedState = {};

			const outputBrandsCopy = { ...state.outputBrands }; // копируем стейт

			if (state.allBrands[keyBrendGroup].length === state.outputBrands[keyBrendGroup].length) {
				//если открыт то нужно закрыть и сгруппировать обратно
				let sortedArray = state.allBrands[keyBrendGroup].sort((a, b) => {
					if (a.main !== b.main) {
						return b.main - a.main;
					} else {
						return a.title.localeCompare(b, undefined, { sensitivity: "base" });
					}
				});
				if (sortedArray.some((el) => el.main)) {
					updatedState[keyBrendGroup] = sortedArray.filter((el, index) => el.main && index < 5);
				} else {
					updatedState[keyBrendGroup] = sortedArray.filter((_, index) => index < 5);
				}
			} else {
				//если закрыт то нужно открыть и отсортировать
				updatedState[keyBrendGroup] = state.allBrands[keyBrendGroup];
			}

			outputBrandsCopy[keyBrendGroup] = updatedState[keyBrendGroup];

			return { ...state, outputBrands: outputBrandsCopy };
		}

		case CHANGE_SORT_TYPE: {
			console.log(payload);

			const brandsCopy = { ...state.outputBrands };

			let sortOrder = 1;
			if (payload) sortOrder = -1;

			let updatetdState = {};
			for (const key in brandsCopy) {
				let sortedArray = brandsCopy[key].sort((a, b) => {
					let x = a.title.toLowerCase();
					let y = b.title.toLowerCase();

					return sortOrder * (x < y ? -1 : x > y ? 1 : 0);
				});
				updatetdState[key] = sortedArray;
			}
			console.log("asa", updatetdState);
			return { ...state, outputBrands: updatetdState };
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

export default brandsReducer;
