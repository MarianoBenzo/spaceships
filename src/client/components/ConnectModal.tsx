import * as React from 'react';
import {useContext, useState} from "react";
import SocketService from "../services/SocketService";
import {SocketContext} from "./SocketProvider";

const styles = require('./styles/connectModal.scss');

export const ConnectModal = () => {

  const {game, id} = useContext(SocketContext);

  const [inputValue, setInputValue] = useState('');

  const playing = game && game.players.includes(id);

  if(playing) {
    return null;
  }

  const connect = () => {
    const name = inputValue === '' ? 'Player' : inputValue;
    SocketService.emitAddShip(name);
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
