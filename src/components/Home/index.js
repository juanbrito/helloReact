import React from 'react';
import agent from '../../agent';
import { Link } from 'react-router-dom';
import RecipeList from '../RecipeList';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: this.props.match.params.searchTerm, recipes: []};
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  handleSearchTermChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  componentDidMount() {
    agent.Recipes.all(this.state.searchTerm).then(data => {
      this.setState({recipes: data.recipes}) 
    })
  }

  render() {
    return (
      <div className="home-page">
        <div className="container page">
          <div className="row">
            <div>
                <div>
                  <input type="text" style={{'verticalAlign': 'top'}} value={this.state.searchTerm} placeholder="Receta..." onChange={this.handleSearchTermChange}/>
                  <span><a href={'/' + this.state.searchTerm} className="btn btn-primary">Buscar</a></span>
                </div>
                <br/>
                <Link to={`/ratings`}>Ver valoraciones</Link>
                <br/>
                <br/>
                <RecipeList recipes={this.state.recipes} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;
