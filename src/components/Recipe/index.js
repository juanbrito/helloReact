import React from 'react';
import agent from '../../agent';
import marked from 'marked';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dinersCount: this.props.match.params.dinersCount ? this.props.match.params.dinersCount : 1,
      recipe: undefined
    };

    this.handleDinersCountChange = this.handleDinersCountChange.bind(this);
    this.handleStarsUpdate = this.handleStarsUpdate.bind(this);
    this.handleSaveNewStarsForRecipe = this.handleSaveNewStarsForRecipe.bind(this);
  }

  handleDinersCountChange(event) {
    this.setState({dinersCount: event.target.value});

    this.props.history.push("/recipe/" + this.state.recipe.id + "/" + event.target.value);

    window.location.reload();
  }

  handleStarsUpdate(event) {
    this.setState({stars: event.target.value});
  }

  handleSaveNewStarsForRecipe(event) {
    const comp = this;
    agent.Recipes.updateStars(this.state.recipe.id, this.state.stars).then(function(){
      comp.props.history.push("/recipe/" + comp.state.recipe.id + "/" + comp.state.dinersCount);
    })
  }

  componentWillMount() {
    agent.Recipes.get(this.props.match.params.id).then(data => {
      this.setState({recipe: data.recipe}) 
      this.setState({stars: data.recipe.stars}) 
    })
    agent.RecipeIngredients.forRecipe(this.props.match.params.id, this.state.dinersCount).then(data => {
      this.setState({recipeIngredients: data.recipeIngredients}) 
    })
    agent.RecipeSteps.forRecipe(this.props.match.params.id).then(data => {
      this.setState({steps: data.steps}) 
    })
  }

  render() {
    if (this.state.recipe == null) {
      return null
    }

    return <div>
      <div><b>{this.state.recipe.title}</b></div>
      <br/>
      {
        this.state.steps != null &&
          <div>
            <b>Pasos</b>
            <div>
              {
                this.state.steps.map(step => {
                  return (
                    <div key={step}>
                      <div>{step}</div>
                    </div>
                  );
                })
              }
            </div>
            <br/>
          </div>
      }
      {this.state.recipeIngredients != null &&
        <div>
          <b>Ingredientes</b>
          <div className="form-inline">
            <span>Para <input type="text" style={{'verticalAlign': 'top'}} value={this.state.dinersCount} onChange={this.handleDinersCountChange}/> Personas</span>
          </div>
          <div>
            {
              this.state.recipeIngredients.map(ingredientPerPerson => {
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
        </div>
      }
      <div>
        <div>Actualizar puntuación</div>
        <input type="text" style={{'verticalAlign': 'top'}} value={this.state.stars} placeholder="Cantidad de estrellas (1...5)" onChange={this.handleStarsUpdate}/>
        <span className="btn btn-primary" onClick={this.handleSaveNewStarsForRecipe}>Guardar</span>
      </div>
    </div>;
  }
}

export default Recipe;
