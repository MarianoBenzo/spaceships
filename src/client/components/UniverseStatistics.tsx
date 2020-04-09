import * as React from 'react';
import {useContext} from "react";
import {SocketContext} from "../services/SocketService";

const styles = require('./styles/universeStatistics.scss');

export const UniverseStatistics = () => {

  const {universeStatistics} = useContext(SocketContext);

  return (
    <div className={styles.container}>
      <div>Universe Statistics: </div>
      { universeStatistics &&
        <div>
          {universeStatistics.statistics.map((statistics: Statistics, index: number) => {
            return <p key={index}>{`${statistics.text}: ${statistics.value}`}</p>
          })}
        </div>
      }
    </div>
  );
};
