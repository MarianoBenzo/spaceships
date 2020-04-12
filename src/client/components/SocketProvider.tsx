import * as React from "react";
import {useEffect, useState} from "react";
import SocketService from "../services/SocketService";
import GameStats from "../models/GameStats";

interface Props {
  children: JSX.Element[] | JSX.Element
}

export interface SocketContextProps {
  gameStats: GameStats;
  id: string;
}

export const SocketContext = React.createContext<SocketContextProps>({
  gameStats: null,
  id: ''
});

const SocketProvider = (props: Props) => {

  const {children} = props;

  const [gameStats, setGameStats] = useState(null);
  const [id, setId] = useState('');

  useEffect(() => {
    SocketService.onGameStats(setGameStats, setId);
  }, []);

  const context: SocketContextProps = {
    gameStats: gameStats,
    id: id
  };

  return (
    <SocketContext.Provider value={context}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketProvider;
