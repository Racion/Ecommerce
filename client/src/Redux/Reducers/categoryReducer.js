import { GET_CATEGORIES, POST_CATEGORY } from "../Action/actionTypes";

const initialState = {
  category: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        category: action.payload,
      };

    case POST_CATEGORY:
      return {
        category: action.payload,
      };  

    default:
      return state;
  }
};

export default categoryReducer;
