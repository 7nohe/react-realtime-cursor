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

export const COLORS = {
  red: { default: '#FF3366' },
  yellow: { default: '#FFBB00' },
  blue: { default: '#0088FF' },
  green: { default: '#22DD88' },
  orange: { default: '#FF8800' },
  pink: { default: '#FF0099' },
  purple: { default: '#AA44FF' },
};
