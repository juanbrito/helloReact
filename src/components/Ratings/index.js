import React from 'react';
import agent from '../../agent';
import RecipeList from '../RecipeList';

class Ratings extends React.Component {
  constructor() {
    super();
    this.state = {bestRecipes: [], worstRecipes: []};
  }

  componentDidMount() {
    agent.Recipes.all(undefined, true, -1).then(data => {
      this.setState({bestRecipes: data.recipes}) 
    })
    agent.Recipes.all(undefined, true, 1).then(data => {
      this.setState({worstRecipes: data.recipes}) 
    })
  }

  render() {
    return (
      <div>
        <div><b>Mejores Recetas</b></div>
        <RecipeList recipes={this.state.bestRecipes} />
        <br/>
        <div><b>Peores Recetas</b></div>
        <RecipeList recipes={this.state.worstRecipes} />
      </div>
    );
  }
}

export default Ratings;
