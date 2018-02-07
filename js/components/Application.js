import { observer } from 'mobx-react';
import React from 'react';

import Canvas from './Canvas';
import Toolbar from './Toolbar';

@observer
export default class Application extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div><Toolbar /><Canvas /></div>
    );
  }
}
