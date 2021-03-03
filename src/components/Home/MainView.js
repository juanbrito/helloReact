import RecipeList from '../RecipeList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.recipeList,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({ });

const MainView = props => {
  return (
    <div className="col-md-9">
      <RecipeList
        recipes={props.recipes}
        loading={props.loading} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
