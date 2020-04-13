import * as React from 'react';
import {useContext} from "react";
import {SocketContext} from "./SocketProvider";
import Player from "../models/Player";

const styles = require('./styles/gameStats.scss');

export const GameStats = () => {

  const {gameStats, id} = useContext(SocketContext);

  if(!gameStats) {
    return null;
  }

  const playersSorted = gameStats.players.sort((player1: Player, player2: Player) => {
    if (player1.kills > player2.kills) {
      return -1;
    }
    if (player1.kills < player2.kills) {
      return 1;
    }
    if (player1.deaths < player2.deaths) {
      return -1;
    }
    if (player1.deaths > player2.deaths) {
      return 1;
    }
    return 0;
  });

  return (
    <div className={styles.container}>
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Kills</th>
          <th>Deaths</th>
        </tr>
        {
          playersSorted.map((player: Player, index: number) => {
            return (
              <tr className={player.id === id ? styles.red : ''}>
                <td>{index + 1}.</td>
                <td>{player.name}</td>
                <td>{player.kills}</td>
                <td>{player.deaths}</td>
              </tr>
            )
          })
        }
      </table>
    </div>
  );
}
