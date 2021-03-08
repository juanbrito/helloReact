import React from 'react';
import agent from '../../agent';
import Ingredients from './ingredients'
import Steps from './steps'

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dinersCount: this.props.match.params.dinersCount ? this.props.match.params.dinersCount : 1,
      recipeLoaded: false,
      ingredientsLoaded: false,
      stepsLoaded: false,
      recipe: undefined,
      recipeIngredients: [],
      steps: []
    };

    this.handleDinersCountChange = this.handleDinersCountChange.bind(this);
    this.handleStarsUpdate = this.handleStarsUpdate.bind(this);
    this.handleSaveNewStarsForRecipe = this.handleSaveNewStarsForRecipe.bind(this);
  }

  handleDinersCountChange(event) {
    this.setState({dinersCount: event.target.value}, () => {
      this.updateIngredients()
      this.props.history.push("/recipe/" + this.state.recipe.id + "/" + this.state.dinersCount);
    });
  }

  handleStarsUpdate(event) {
    this.setState({stars: event.target.value});
  }

  handleSaveNewStarsForRecipe(event) {
    agent.Recipes.updateStars(this.state.recipe.id, this.state.stars)
  }

  updateIngredients(){
    agent.RecipeIngredients.forRecipe(this.props.match.params.id, this.state.dinersCount).then(data => {
      this.setState({recipeIngredients: data.recipeIngredients}, () => {
        this.setState({ingredientsLoaded: true})
      })
    })
  }

  componentDidMount() {
    agent.Recipes.get(this.props.match.params.id).then(data => {
      this.setState({recipe: data.recipe}, () => 
        this.setState({stars: data.recipe.stars}, () =>
          this.setState({recipeLoaded: true}) 
        )   
      ) 
    })
    this.updateIngredients()
    agent.RecipeSteps.forRecipe(this.props.match.params.id).then(data => {
      this.setState({steps: data.steps}, () => 
        this.setState({stepsLoaded: true}) 
      ) 
    })
  }

  render() {
    if (!this.state.recipeLoaded) {
      return <div>
        Loading...
      </div>
    }

    return <div>
      <div><b>{this.state.recipe.title}</b></div>
      <br/>
      {
        this.state.stepsLoaded &&
          <Steps steps={this.state.steps}/>
      }
      {this.state.ingredientsLoaded &&
          <Ingredients ingredients={this.state.recipeIngredients} dinersCount={this.state.dinersCount} handleDinersCountChange={this.handleDinersCountChange}/>
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
