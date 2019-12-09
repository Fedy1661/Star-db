import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator/';
import Spinner from '../spinner';

export default class PersonDetails extends Component {
  SwapiService = new SwapiService();
  state = {
    person:{},
    loading: true,
    error: false
  }
  componentDidMount(){
    this.updatePerson()
  }
  componentDidUpdate(prevProps){
    if (this.props.personId !== prevProps.personId){
      this.setState({
        loading:true
      })
      this.updatePerson();
    }
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }
  onPersonLoaded = (person) => {
    this.setState({person,loading: false})
  }
  updatePerson = () => {
    const id = this.props.personId;
    this.SwapiService
      .getPerson(id)
      .then(this.onPersonLoaded)
      .catch(this.onError);
  }
  render() {
    const {person, loading, error} = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <PersonView person={person}/> : null;
    
    return (
      <div className="person-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const PersonView = ({person}) => {
  const {id,name,gender,birthYear, eyeColor} = person;
  return(
    <React.Fragment>
      <img className="person-image" alt={id}
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  )
}