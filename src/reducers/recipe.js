import {
  RECIPE_PAGE_LOADED,
  RECIPE_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case RECIPE_PAGE_LOADED:
      return {
        ...state,
        recipe: action.payload[0].recipe,
        recipeIngredients: action.payload[1].recipeIngredients,
        steps: action.payload[2].steps,
        dinersCount: action.payload[3]
      };
    case RECIPE_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
