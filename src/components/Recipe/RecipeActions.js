import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({ });

const RecipeActions = props => {
  const recipe = props.recipe;
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${recipe.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Recipe
        </Link>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(RecipeActions);
