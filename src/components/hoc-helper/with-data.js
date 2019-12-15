import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorBoundary from '../error-boundary';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {
  return class extends Component {
    state = {
      data: null,
      loading: true,
      error: false
    }
    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
        this.setState({
          data: null
        })
      }
    }
    componentDidMount() {
      this.update()
    }
    update = () => {
      this.setState({
        loading: true,
        error: false
      });
      this.props.getData()
        .then((data) => {
          this.setState({
            data,
            loading: false
          })
        })
        .catch(() => {
          this.setState({ error: true, loading: false })
        })
    }
    render() {
      const { data, loading, error } = this.state;

      if(loading) {
        return <Spinner />
      }
      if(error) {
        return <ErrorIndicator/>
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