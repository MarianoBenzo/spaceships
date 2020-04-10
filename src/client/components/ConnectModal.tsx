import * as React from 'react';
import {useEffect, useState} from "react";
import SocketService from "../services/SocketService";

const styles = require('./styles/connectModal.scss');

export const ConnectModal = () => {

  const [playing, setPlaying] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    SocketService.onShipDead(setPlaying);
  }, []);

  if(playing) {
    return null;
  }

  const connect = () => {
    const name = inputValue === '' ? 'Player' : inputValue;
    SocketService.emitAddShip(name);
    setPlaying(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div>Enter player name: </div>
        <input type="text"
               value={inputValue}
               placeholder="Player"
               onChange={e => setInputValue(e.target.value)}/>
        <button onClick={connect}>
          Play
        </button>
      </div>
    </div>
  );
}
