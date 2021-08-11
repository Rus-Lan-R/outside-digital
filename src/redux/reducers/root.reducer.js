import { combineReducers } from "redux";

import brandsReducer from "./brands.reducer";

const reducer = combineReducers({
	brands: brandsReducer,
});

export default reducer;
