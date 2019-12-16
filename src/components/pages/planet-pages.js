import React from 'react';
import { PlanetDetails, PlanetList } from '../sw-components';
import Row from '../row';

const PlanetPage = ({ history, match }) => {
  console.log(history);
  const { id } = match.params;
  return (
    <Row
      left={<PlanetList onItemSelected={(id) => history.push(id)} />}
      right={<PlanetDetails itemId={id} />}
    />
  )
}

export default PlanetPage;