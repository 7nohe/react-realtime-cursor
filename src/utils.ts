import { CURSOR_STYLE } from './const';

type ThrottledFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;

export function throttle<T extends (...args: any) => any>(
  func: T,
  wait = 100
): ThrottledFunction<T> {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function(this: any) {
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
