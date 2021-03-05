import {
  RATINGS_PAGE_LOADED,
  RATINGS_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case RATINGS_PAGE_LOADED:
      return {
        ...state,
        bestRecipes: action.payload[0].recipes,
        worstRecipes: action.payload[1].recipes,
        loading: false
      };
    case RATINGS_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
