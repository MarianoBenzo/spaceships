import * as React from "react";
import {useEffect, useState} from "react";
import * as io from "socket.io-client";
import CanvasService from "./CanvasService";
import UniverseStatistics from "../models/UniverseStatistics";
import Universe from "../models/Universe";

interface Props {
  children: JSX.Element[] | JSX.Element
}

export interface SocketContextProps {
  universeStatistics: UniverseStatistics;
}

export const SocketContext = React.createContext<SocketContextProps>({
  universeStatistics: null
});

const SocketService = (props: Props) => {

  const {children} = props;

  const [universeStatistics, setUniverseStatistics] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const socket = io();

    socket.on('connect', () => {

      socket.on('spaceships::universe', (universe: Universe) => {
        console.log(universe);
        CanvasService.drawUniverse(universe, socket.id);
      });

      socket.on('spaceships::statistics', (universeStatistics: UniverseStatistics) => {
        setUniverseStatistics(universeStatistics);
      });
    });
  };

  const context: SocketContextProps = {
    universeStatistics: universeStatistics
  };

  return (
    <SocketContext.Provider value={context}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketService;
