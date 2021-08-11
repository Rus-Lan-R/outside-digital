import { SET_BRANDS } from "../types/brandsTypes";

const userReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_BRANDS:
			return action.payload;

		default:
			return state;
	}
};

export default userReducer;
