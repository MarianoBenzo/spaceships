import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SocketProvider from "./components/SocketProvider";
import {Canvas} from "./components/Canvas";
import {StartModal} from "./components/StartModal";

const App = () => {
  return (
    <SocketProvider>
      <StartModal/>
      <Canvas/>
    </SocketProvider>
  )
};

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
