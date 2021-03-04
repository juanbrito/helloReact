import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import RecipeList from '../RecipeList';
import {
  RATINGS_PAGE_LOADED,
  RATINGS_PAGE_UNLOADED
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.ratings,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: RATINGS_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({  type: RATINGS_PAGE_UNLOADED })
});

class Ratings extends React.Component {
  componentWillMount() {
    this.props.onLoad(agent.Recipes.all());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <RecipeList recipes={this.props.recipes} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ratings);
