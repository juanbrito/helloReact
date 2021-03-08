import Header from './Header';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Recipe from '../components/Recipe';
import Home from '../components/Home';
import Ratings from '../components/Ratings';

class App extends React.Component {
  render() {
    const appName = "Recipes App"

    return (
      <div>
        <Header appName={appName} />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/recipe/:id/:dinersCount" component={Recipe} />
            <Route exact path="/ratings" component={Ratings} />
            <Route path="/:searchTerm" component={Home}/>
          </Switch>
      </div>
    );
  }
}

export default App;
