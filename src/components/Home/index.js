import Banner from './Banner';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RecipeList from '../RecipeList';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: HOME_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: props.searchTerm};

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  handleSearchTermChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Recipes.all(this.props.match.params.searchTerm),
      Promise.resolve(this.props.match.params.searchTerm !== 'undefined' ? this.props.match.params.searchTerm : '')
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">

        <Banner token={this.props.token} appName={this.props.appName} />

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
                <RecipeList 
                  recipes={this.props.recipes}
                  loading={this.props.loading}
                />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
