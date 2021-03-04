import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { RECIPE_PAGE_LOADED, RECIPE_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.recipe,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: RECIPE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: RECIPE_PAGE_UNLOADED })
});

class Recipe extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Recipes.get(this.props.match.params.id),
      agent.RecipeIngredients.forRecipe(this.props.match.params.id),
      agent.RecipeSteps.forRecipe(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.recipe) {
      return null;
    }

    return <div>
      <div>{this.props.recipe.title}</div>
      <br/>
      <div>Pasos</div>
      <div>
        {
          this.props.steps.map(step => {
            return (
              <div key={step}>
                <div>{step}</div>
              </div>
            );
          })
        }
      </div>
      <br/>
      <div>Ingredientes</div>
      <div>Para X Personas</div>
      <div>
        {
          this.props.recipeIngredients.map(ingredientPerPerson => {
            return (
              <div key={ingredientPerPerson.name}>
                <div>{ingredientPerPerson.name}</div>
                <div>{ingredientPerPerson.amount}</div>
                <div>{ingredientPerPerson.amountUnit}</div>
              </div>
            );
          })
        }
      </div>
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
