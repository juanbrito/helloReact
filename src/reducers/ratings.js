import {
  RATINGS_PAGE_LOADED,
  RATINGS_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case RATINGS_PAGE_LOADED:
      return {
        ...state,
        recipes: action.payload.recipes,
        loading: false
      };
    case RATINGS_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
