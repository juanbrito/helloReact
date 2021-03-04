import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = props => {
  if (!props.recipes) {
    return (
      <div className="recipe-preview">Loading...</div>
    );
  }

  if (props.recipes.length === 0) {
    return (
      <div className="recipe-preview">
        No recipe matching search criteria
      </div>
    );
  }

  return (
    <div>
      {
        props.recipes.map(recipe => {
          return (
            <div key={recipe.title}>
              <Link to={`/recipe/${recipe.id}`} className="preview-link">{recipe.title}</Link>
              <div>{recipe.stars}</div>
            </div>
          );
        })
      }
    </div>
  );
};

export default RecipeList;
