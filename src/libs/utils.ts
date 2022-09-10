import { ROOT_CLASS_NAME } from '../const';

export const getCursorPositionRatio = (
  x: number,
  y: number
): { ratioX: number; ratioY: number } => {
  const rect = window.document
    .querySelector(ROOT_CLASS_NAME)
    ?.getBoundingClientRect();
  if (!rect) {
    throw Error('Unable to find `react-realtime-cursor` className in document');
  }
  const ratioX = (x - rect.x) / rect.width;
  const ratioY = (y - rect.y) / rect.height;
  return {
    ratioX,
    ratioY,
  };
};

export const getCursorPosition = (
  ratioX: number,
  ratioY: number
): { x: number; y: number } => {
  const rect = window.document
    .querySelector(ROOT_CLASS_NAME)
    ?.getBoundingClientRect();
  if (!rect) {
    throw Error('Unable to find `react-realtime-cursor` className in document');
  }
  const x = rect.width * ratioX + rect.x;
  const y = rect.height * ratioY + rect.y;
  return {
    x,
    y,
  };
};
