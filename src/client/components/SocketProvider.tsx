import * as React from "react";
import {useEffect, useState} from "react";
import UniverseStatistics from "../models/UniverseStatistics";
import SocketService from "../services/SocketService";

interface Props {
  children: JSX.Element[] | JSX.Element
}

export interface SocketContextProps {
  universeStatistics: UniverseStatistics;
}

export const SocketContext = React.createContext<SocketContextProps>({
  universeStatistics: null
});

const SocketProvider = (props: Props) => {

  const {children} = props;

  const [universeStatistics, setUniverseStatistics] = useState(null);

  useEffect(() => {
    SocketService.onSpaceshipsStatistics(setUniverseStatistics);
  }, []);

  const context: SocketContextProps = {
    universeStatistics: universeStatistics
  };

  return (
    <SocketContext.Provider value={context}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketProvider;
