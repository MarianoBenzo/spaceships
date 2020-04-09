import * as React from 'react';
import {useEffect} from "react";
import CanvasService from "../services/CanvasService";

export const Canvas = () => {

  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    CanvasService.initialize(canvas);
  }, []);

  return (
    <canvas id='canvas'>Error</canvas>
  );
};
