import * as React from 'react';
import {useContext, useState} from "react";
import SocketService from "../services/SocketService";
import {SocketContext} from "./SocketProvider";

const styles = require('./styles/startModal.scss');

export const StartModal = () => {

  const {gameStats, id} = useContext(SocketContext);

  const [inputValue, setInputValue] = useState('');

  const player = gameStats && gameStats.players.find(player => player.id === id);

  const setNameAndConnect = () => {
    const name = inputValue === '' ? 'Player' : inputValue
    start(name)
  };

  const start = (name: string) => {
    SocketService.emitPlayerStart(name);
  };

  if(player && player.alive) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        { !player &&
          <>
            <div>Enter player name:</div>
            <input type="text"
                   value={inputValue}
                   placeholder="Player"
                   onChange={e => setInputValue(e.target.value.slice(0, 20))}/>
            <button onClick={setNameAndConnect}>
              Play
            </button>
          </>
        }
        { player && !player.alive &&
          <>
            <div>You died</div>
            <button onClick={() => start(name)}>
              Respawn
            </button>
          </>
        }
      </div>
    </div>
  );
}
