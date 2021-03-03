import React from 'react';

const RecipeList = props => {
  if (!props.recipes) {
    return (
      <div className="recipe-preview">Loading...</div>
    );
  }

  if (props.recipes.length === 0) {
    return (
      <div className="recipe-preview">
        No recipes are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.recipes.map(recipe => {
          return (
            <div>{recipe.Name}</div>
          );
        })
      }
    </div>
  );
};

export default RecipeList;
