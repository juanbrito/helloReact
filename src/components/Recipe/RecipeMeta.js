import RecipeActions from './RecipeActions';
import { Link } from 'react-router-dom';
import React from 'react';

const RecipeMeta = props => {
  const recipe = props.recipe;
  return (
    <div className="recipe-meta">
      <Link to={`/@${recipe.author.username}`}>
        <img src={recipe.author.image} alt={recipe.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${recipe.author.username}`} className="author">
          {recipe.author.username}
        </Link>
        <span className="date">
          {new Date(recipe.createdAt).toDateString()}
        </span>
      </div>

      <RecipeActions canModify={props.canModify} recipe={recipe} />
    </div>
  );
};

export default RecipeMeta;
