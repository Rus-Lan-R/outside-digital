import {
	REVERSE_BRANDS_SORT,
	SET_ALL_BRANDS,
	FOLD_CURRENT_BRAND_GROUP,
	DELETE_BRANDS,
	ADD_NEW_BRAND,
	UPDATE_BRAND,
} from "../types/brandsTypes";

const brandsReducer = (state = {}, action) => {
	const { payload, type } = action;
	switch (type) {
		case SET_ALL_BRANDS:
			const sortedArrayBrands = sortArray(payload, "title", false); // сортируем исходный массив объектов
			const groupedBrands = groupBrandsByFirstChar(sortedArrayBrands); // функция группирует массив объектов в двумерный массив, где первый элемент это первая буква текста в titlt  //=> ["A",[{_id:1, title:"asdds"},{_id:2, title:"addklsd"}]]
			const updatetdBrandsList = groupedBrands.map((el) => [...el, { isOpen: false }]); // добавляю флаг с помощью которого буду разврачивать список

			// подготовка списка для вывода (если есть хоть один элемент с атрибутом main:true, то вывожу только те где main true) иначе вывожу первые 5
			updatetdBrandsList.forEach((group) => {
				if (group[1].some((el) => el.main)) {
					let countTrue = 0;
					group[1].forEach((brand) => {
						if (brand.main && countTrue++ < 5) {
							brand.hide = false;
						} else {
							brand.hide = true;
						}
					});
				} else {
					group[1].forEach((brand, index) =>
						index < 5 ? (brand.hide = false) : (brand.hide = true),
					);
				}
			});

			return updatetdBrandsList; // стейт в  виде двумерного массива
		//  [["A",[{_id:1, title:"asdds"},{_id:2, title:"addklsd"}]
		//   ["B",[{_id:4, title:"bsdds"},{_id:6, title:"bddklsd"}]
		//   ["C,"[{_id:23, title:"Csdds"},{_id:62, title:"cddklsd"}]]

		case ADD_NEW_BRAND: {
			const copyBrands = [...state];
			const firstCharNewBrand = payload.title.charAt(0).toLowerCase();
			const newBrand = { ...payload, hide: false }; //hide:false нужен для отображения в short view
			const index = copyBrands.findIndex((el) => el[0] === firstCharNewBrand);
			//ищу индекс в двумерном массиве который соответсвует первой букве заголовка

			if (index !== -1) {
				copyBrands[index][1].push({ ...payload, hide: false });
			} else {
				copyBrands.push([firstCharNewBrand, [newBrand], { isOpen: false }]);
			}
			return copyBrands;
		}

		case UPDATE_BRAND: {
			const copyBrands = [...state];

			copyBrands.forEach((group) => {
				let index = group[1].findIndex((el) => el._id === payload._id);
				if (index !== -1) {
					group[1][index] = { ...payload, hiden: false };
				}
			});

			return copyBrands;
		}

		case DELETE_BRANDS: {
			const copyBrands = [...state];

			copyBrands.forEach((group) => {
				let index = group[1].findIndex((el) => el._id === payload);
				if (index !== -1) {
					group[1].splice(index, 1);
				}
			});

			return copyBrands;
		}

		case FOLD_CURRENT_BRAND_GROUP: {
			const copyBrands = [...state];
			const keyBrandGroup = payload;

			copyBrands.forEach((group) => {
				if (group[0] === keyBrandGroup) {
					group[2].isOpen = !group[2].isOpen;
				}
			});

			return copyBrands;
		}

		case REVERSE_BRANDS_SORT: {
			const reverse = payload;
			const copyBrands = [...state];

			const sortedGroupBrands = sortArray(copyBrands, 0, reverse); // сначала сортирую массив первых букв ["A",[{_id:1, title:"asdds"},{_id:2, title:"addklsd"}]]

			sortedGroupBrands.forEach((group) => {
				group[1] = sortArray(group[1], "title", reverse);
			});
			return sortedGroupBrands;
		}
		default:
			return state;
	}
};

const groupBrandsByFirstChar = (array) => {
	// функция которая группирует массивы по первым буквам
	const groupBrandsObj = array.reduce((el, current) => {
		el[current.title.charAt(0).toLowerCase()]
			? el[current.title.charAt(0).toLowerCase()].push(current)
			: (el[current.title.charAt(0).toLowerCase()] = [current]);

		return el;
	}, {});

	return Object.entries(groupBrandsObj); // делаем из объекта массив
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
