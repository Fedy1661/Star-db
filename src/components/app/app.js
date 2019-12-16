import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './bootstrap.min.css';
import './app.css';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import ErrorBoundary from '../error-boundary';
import { PeoplePage, PlanetPage, StarshipsPage, SecretPage, LoginPage } from '../pages';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

class App extends Component {
  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false

  }
  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }
  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      console.log(Service.name);
      return {
        swapiService: new Service()
      }
    })
  }
  render() {
    const { isLoggedIn } = this.state;
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <Header onServiceChange={this.onServiceChange} />

            <RandomPlanet />

            <Switch>
              <Route path='/' exact />
              <Route path='/people/:id?' exact component={PeoplePage} />
              <Route path='/planets' exact component={PlanetPage} />
              <Route path='/starships' exact component={StarshipsPage} />
              <Route path='/starships/:id' exact render={({ match }) => {
                const { id } = match.params;
                return <StarshipDetails itemId={id} />
              }} />
              <Route path='/login' render={() => (
                <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
              )} />
              <Route path='/secret' render={() => (
                <SecretPage isLoggedIn={isLoggedIn} />
              )} />

              <Route render={() => <h2>Page is not found</h2>} />
            </Switch>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    )
  }
}

export default App;