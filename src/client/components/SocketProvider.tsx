import * as React from "react";
import {useEffect, useState} from "react";
import SocketService from "../services/SocketService";
import Game from "../models/Game";

interface Props {
  children: JSX.Element[] | JSX.Element
}

export interface SocketContextProps {
  game: Game;
  id: string;
}

export const SocketContext = React.createContext<SocketContextProps>({
  game: null,
  id: ''
});

const SocketProvider = (props: Props) => {

  const {children} = props;

  const [game, setGame] = useState(null);
  const [id, setId] = useState('');

  useEffect(() => {
    SocketService.onSpaceshipsGame(setGame, setId);
  }, []);

  const context: SocketContextProps = {
    game: game,
    id: id
  };

  return (
    <SocketContext.Provider value={context}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketProvider;
