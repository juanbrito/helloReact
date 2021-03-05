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
    dispatch({ type: RECIPE_PAGE_UNLOADED }),
});

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {dinersCount: props.dinersCount};

    this.handleDinersCountChange = this.handleDinersCountChange.bind(this);
  }

  handleDinersCountChange(event) {
    this.setState({dinersCount: event.target.value});
  }

  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Recipes.get(this.props.match.params.id),
      agent.RecipeIngredients.forRecipe(this.props.match.params.id, this.props.match.params.dinersCount !== 'undefined' ? this.props.match.params.dinersCount : 1),
      agent.RecipeSteps.forRecipe(this.props.match.params.id),
      Promise.resolve(this.props.match.params.dinersCount !== 'undefined' ? this.props.match.params.dinersCount : 1)
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
      <div><b>{this.props.recipe.title}</b></div>
      <br/>
      <div><b>Pasos</b></div>
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
      <div><b>Ingredientes</b></div>
      <div class="form-inline">
        <span>Para <input type="text" style={{'vertical-align': 'top'}} value={this.state.dinersCount} onChange={this.handleDinersCountChange}/> Personas</span>
      </div>
      <div>
        {
          this.props.recipeIngredients.map(ingredientPerPerson => {
            return (
              <div key={ingredientPerPerson.name}>
                <span>{ingredientPerPerson.name} </span>
                <span>{ingredientPerPerson.amount} </span>
                <span>{ingredientPerPerson.amountUnit}</span>
              </div>
            );
          })
        }
      </div>
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
