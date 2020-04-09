import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SocketProvider from "./components/SocketProvider";
import {UniverseStatistics} from "./components/UniverseStatistics";
import {Canvas} from "./components/Canvas";

const App = () => {
  return (
    <SocketProvider>
      <UniverseStatistics/>
      <Canvas/>
    </SocketProvider>
  )
};

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
