import * as React from 'react';
import {useContext, useState} from "react";
import SocketService from "../services/SocketService";
import {SocketContext} from "./SocketProvider";

const styles = require('./styles/connectModal.scss');

export const ConnectModal = () => {

  const {game, id} = useContext(SocketContext);

  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState(null);

  const playing = game && game.players.includes(id);

  const setNameAndConnect = () => {
    const name = inputValue === '' ? 'Player' : inputValue
    setName(name);
    connect(name)
  };

  const connect = (name: string) => {
    SocketService.emitAddShip(name);
  };

  if(playing) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        { !name &&
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
        { name &&
          <>
            <div>Has muerto</div>
            <button onClick={() => connect(name)}>
              Volver a jugar
            </button>
          </>
        }
      </div>
    </div>
  );
}
