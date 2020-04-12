import * as React from "react";
import {useEffect, useState} from "react";
import SocketService from "../services/SocketService";

interface Props {
  children: JSX.Element[] | JSX.Element
}

export interface SocketContextProps {
  game: string[];
  id: string;
}

export const SocketContext = React.createContext<SocketContextProps>({
  game: [],
  id: ''
});

const SocketProvider = (props: Props) => {

  const {children} = props;

  const [game, setGame] = useState([]);
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
