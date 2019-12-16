import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './bootstrap.min.css';
import './app.css';
import SwapiService from '../../services/swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import ErrorBoundary from '../error-boundary';
import { PeoplePage, PlanetPage, StarshipsPage } from '../pages';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  state = {
    swapiService: new SwapiService()
  }
  render() {
    const toHomePage = <Redirect to='/people/1'/>;
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <Header />

            <RandomPlanet />

            <Switch>
              <Route path='/' exact render={() => toHomePage} />
              
              <Route path='/people/:id?' exact component={PeoplePage} />
              <Route path='/planets/:id?' exact component={PlanetPage} />
              <Route path='/starships/:id?' exact component={StarshipsPage} />

              <Route render={() => toHomePage} />
            </Switch>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    )
  }
}

export default App;