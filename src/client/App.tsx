import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SocketService from "./services/SocketService";
import {UniverseStatistics} from "./components/UniverseStatistics";
import {Canvas} from "./components/Canvas";

const App = () => {
  return (
    <SocketService>
      <UniverseStatistics/>
      <Canvas/>
    </SocketService>
  )
};

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
