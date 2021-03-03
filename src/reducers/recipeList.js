import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        recipes: action.payload.recipes
      };
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
