import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SocketProvider from "./components/SocketProvider";
import {Canvas} from "./components/Canvas";
import {ConnectModal} from "./components/ConnectModal";

const App = () => {
  return (
    <SocketProvider>
      <ConnectModal/>
      <Canvas/>
    </SocketProvider>
  )
};

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
