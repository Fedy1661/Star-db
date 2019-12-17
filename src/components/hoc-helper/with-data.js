import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorBoundary from '../error-boundary';
import ErrorIndicator from '../error-indicator';
const withData = (View) => {
  return class extends Component {
    _isMounted = false
    state = {
      data: null,
      loading: true,
      error: false
    }
    setStatus = (data) => {
      if (this._isMounted) {
        this.setState(data)
      }
    }
    componentDidUpdate(prevProps) {
      this._isMounted = true
      if (this.props.getData !== prevProps.getData) {
        this.update();
        this.setStatus({
          data: null
        })
      }
    }
    componentDidMount() {
      this._isMounted = true
      this.update()
    }
    componentWillUnmount() {
      this._isMounted = false
    }
    update = () => {
      this.setStatus({
        loading: true,
        error: false
      });
      this.props.getData()
        .then((data) => {
          if (this._isMounted) {
            this.setStatus({
              data,
              loading: false
            })
          }
        })
        .catch(() => {
          this.setStatus({ error: true, loading: false })
        })
    }
    render() {
      const { data, loading, error } = this.state;

      if (loading) {
        return <Spinner />
      }
      if (error) {
        return <ErrorIndicator />
      }

      return (
        <ErrorBoundary>
          <View {...this.props} data={data} />
        </ErrorBoundary>
      )
    }
  }
}
export default withData;