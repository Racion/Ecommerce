import { SEARCH_CATEGORIE, SEARCH_PRODUCTS } from '../Action/actionTypes';

const initialState = {
	result: []
}

const searchReducer = (state = initialState, action ) => {
	switch (action.type) {
		case SEARCH_PRODUCTS: 
			return {
			...state,
			result: action.payload
		}
		case SEARCH_CATEGORIE: 
			return {
			...state,
			result: action.payload
		}
		default: return state
	}
};
export default searchReducer;