import * as React from 'react';
import {useEffect} from "react";
import CanvasService from "../services/CanvasService";
import KeysEventsService from "../services/KeysEventsService";

export const Canvas = () => {

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    CanvasService.initialize(canvas);
    KeysEventsService.initialize();
  }, []);

  return (
    <canvas id='canvas'>Error</canvas>
  );
};
