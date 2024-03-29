import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

export const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
};


export default class ItemDetails extends Component {
  swapiService = new SwapiService();
  _isMounted = false
  state = {
    item: {},
    loading: true,
    error: false,
    image: null
  }
  setStatus = (data) => {
    if (this._isMounted) {
      this.setState(data)
    }
  }
  componentDidMount() {
    this._isMounted = true
    this.updateItem()
  }
  componentDidUpdate(prevProps) {
    this._isMounted = true
    if (this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl) {
      this.setStatus({
        loading: true,
        error: false
      })
      this.updateItem();
    }
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  onError = (err) => {
    this.setStatus({
      error: true,
      loading: false
    })
  }
  onItemLoaded = (item) => {
    this.setStatus({ item, loading: false })
  }
  updateItem = () => {
    const { itemId, getData, getImageUrl } = this.props;
    getData(itemId)
      .then((item) => {
        this.setStatus({
          item,
          loading: false,
          image: getImageUrl(item)
        });
      })
      .catch(this.onError);
  }
  render() {
    const { item, loading, error, image } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ItemView item={item} image={image} children={this.props.children} /> : null;

    return (
      <div className="person-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const ItemView = ({ item, image, children }) => {
  const { id, name } = item;
  return (
    <React.Fragment>
      <img className="person-image" alt={id}
        src={image} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(children, (child) => {
              return React.cloneElement(child, { item });
            })
          }
        </ul>
      </div>
    </React.Fragment>
  )
}