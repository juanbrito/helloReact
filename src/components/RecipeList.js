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
        No hay recetas que cumplan el filtro seleccionado
      </div>
    );
  }

  return (
    <div>
      {
        props.recipes.map(recipe => {
          return (
            <div key={recipe.title}>
              <Link to={`/recipe/${recipe.id}/1`} className="preview-link">{recipe.title}</Link>
              <span> - {recipe.stars} Stars</span>
            </div>
          );
        })
      }
    </div>
  );
};

export default RecipeList;
