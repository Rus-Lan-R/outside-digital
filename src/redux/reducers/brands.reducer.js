import {
	REVERSE_BRANDS_SORT,
	SET_ALL_BRANDS,
	FOLD_CURRENT_BRAND_GROUP,
	SEARCH_BRANDS,
} from "../types/brandsTypes";

const brandsReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case SET_ALL_BRANDS:
			const sortedArrayBrands = sortArray(payload, "title", false); // сортируем исходный массив объектов
			const groupedBrands = groupBrandsByFirstChar(sortedArrayBrands); // функция группирует массив объектов в двумерный массив, где первый элемент это первая буква текста в titlt  //=> ["A",[{_id:1, title:"asdds"},{_id:2, title:"addklsd"}]]
			const updatetdBrandsList = groupedBrands.map((el) => [...el, { isOpen: false }]); // добавляю флаг с помощью которого буду разврачивать список

			updatetdBrandsList.forEach((el) => {
				// подготовка списка для вывода (если есть хоть один элемент с атрибутом main:true, то вывожу только те где main true) иначе вывожу первые 5
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
					return el[1].forEach((_, index) => (index < 5 ? (el.hide = true) : (el.hide = false)));
				}
			});

			return updatetdBrandsList;

		case FOLD_CURRENT_BRAND_GROUP: {
			let copyBrands = [...state];

			copyBrands.forEach((el) => {
				if (el[0] === payload) {
					el[2] = !el[2];
				}
			});

			return copyBrands;
		}

		case REVERSE_BRANDS_SORT: {
			console.log(payload);
			const reverse = payload;
			const copyBrands = [...state];

			const sortedGroupBrands = sortArray(copyBrands, 0, reverse); // сначала сортирую массив первых букв ["A",[{_id:1, title:"asdds"},{_id:2, title:"addklsd"}]]

			sortedGroupBrands.forEach((group) => {
				group[1] = sortArray(group[1], "title", reverse);
			});

			console.log(sortedGroupBrands);

			return sortedGroupBrands;
		}

		case SEARCH_BRANDS: {
			const { findText, checkRegister } = payload;

			let copyBrands = [...state];

			copyBrands.forEach((group) => {
				//первым циклом ищу группу брендов,объединные по первой букве
				group[2] = false;
				group[1].forEach((el) => {
					if (group[0] === findText.charAt(0).toLowerCase()) {
						if (
							(el.title.match(findText) && checkRegister) ||
							(el.title.toLowerCase().match(findText.toLowerCase()) && !checkRegister)
						) {
						}
						// затем ищу совпадение в массиве объектов по ключу title
						if (el.title.match(findText)) {
							el.hide = false;
						} else el.hide = true;
					} else {
						el.hide = true;
					}
					if (!findText.charAt(0).toLowerCase()) {
						el.hide = false;
					}
				});
			});

			return copyBrands;
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

const sortArray = (array, key, reverse) => {
	//array - массив который надо отсортировать key - ключ по которому сортируем reverse - тип сортировки [true-(Z-A) false-(A-Z)]
	let sortOrder = 1;
	if (reverse) sortOrder = -1;

	let sortedArray = array.sort((a, b) => {
		let x = a[key].toLowerCase();
		let y = b[key].toLowerCase();

		return sortOrder * (x < y ? -1 : x > y ? 1 : 0);
	});
	return sortedArray;
};

export default brandsReducer;
