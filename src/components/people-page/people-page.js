import React, { Component } from 'react';

import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import ErrorBoundary from '../error-boundary';

const Row = ({ right, left }) => {
  return (
    <div className="items row mb2">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        {right}
      </div>
    </div>
  )
}

export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedPerson: 1
  }
  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: +id
    })
  }
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    const itemList = (
      <ItemList onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
        {(i) => i.name}
      </ItemList>
    );
    const itemDetails = (
      <ItemDetails itemId={this.state.selectedPerson}
        getData={this.swapiService.getPerson}
        getImageUrl={this.swapiService.getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="birthYear" label="Birth year" />
        <Record field="eyeColor" label="Eye color" />
      </ItemDetails>
    );
    return (
      <ErrorBoundary>
        <Row left={itemList} right={itemDetails} />
      </ErrorBoundary>
    )
  }
}