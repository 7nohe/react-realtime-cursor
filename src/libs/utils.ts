import { ROOT_CLASS_NAME, CURSOR_STYLE } from "../const";

export const getCursorPositionRatio = (
  x: number,
  y: number
): { ratioX: number; ratioY: number } => {
  const rect = window.document
    .querySelector(ROOT_CLASS_NAME)
    ?.getBoundingClientRect();
  if (!rect) {
    throw Error("Unable to find `react-realtime-cursor` className in document");
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
    throw Error("Unable to find `react-realtime-cursor` className in document");
  }
  const x = rect.width * ratioX + rect.x;
  const y = rect.height * ratioY + rect.y;
  return {
    x,
    y,
  };
};

type ThrottledFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;

export function throttle<T extends (...args: any) => any>(
  func: T,
  wait = 100
): ThrottledFunction<T> {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (this: any) {
    const args = arguments as any;
    const context = this;
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
      lastResult = func.apply(context, args);
    }
    return lastResult;
  };
}

export const getStyle = (id?: string) => {
  const index = (id?.charCodeAt(0) || 0) % CURSOR_STYLE.length;
  return CURSOR_STYLE[index];
};
