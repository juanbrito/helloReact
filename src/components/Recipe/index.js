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

    this.state = {
      dinersCount: props.dinersCount ? props.dinersCount : undefined,
      stars: props.recipe ? props.recipe.stars : undefined // DUNNO WHY THIS IS NOT WORKING
    };

    this.handleDinersCountChange = this.handleDinersCountChange.bind(this);
    this.handleStarsUpdate = this.handleStarsUpdate.bind(this);
    this.handleSaveNewStarsForRecipe = this.handleSaveNewStarsForRecipe.bind(this);
  }

  handleDinersCountChange(event) {
    this.setState({dinersCount: event.target.value});

    this.props.history.push("/recipe/" + this.props.recipe.id + "/" + event.target.value);

    window.location.reload();
  }

  handleStarsUpdate(event) {
    this.setState({stars: event.target.value});
  }

  handleSaveNewStarsForRecipe(event) {
    const comp = this;
    agent.Recipes.updateStars(this.props.recipe.id, this.state.stars).then(function(){
      comp.props.history.push("/recipe/" + comp.props.recipe.id + "/" + comp.state.dinersCount);
    })
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

    if(this.state.dinersCount == undefined){
      this.setState({dinersCount: this.props.dinersCount});
    }

    if(this.state.stars == undefined){
      this.setState({stars: this.props.recipe.stars});
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
      <div className="form-inline">
        <span>Para <input type="text" style={{'verticalAlign': 'top'}} value={this.state.dinersCount} onChange={this.handleDinersCountChange}/> Personas</span>
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
      <br/>
      <br/>
      <div>
        <div>Actualizar puntuación</div>
        <input type="text" style={{'verticalAlign': 'top'}} value={this.state.stars} placeholder="Cantidad de estrellas (1...5)" onChange={this.handleStarsUpdate}/>
        <span className="btn btn-primary" onClick={this.handleSaveNewStarsForRecipe}>Guardar</span>
      </div>
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
