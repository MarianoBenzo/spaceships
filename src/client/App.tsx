import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SocketProvider from "./components/SocketProvider";
import {Canvas} from "./components/Canvas";
import {StartModal} from "./components/StartModal";
import {GameStats} from "./components/GameStats";

const App = () => {
  return (
    <SocketProvider>
      <Canvas/>
      <GameStats/>
      <StartModal/>
    </SocketProvider>
  )
};

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
