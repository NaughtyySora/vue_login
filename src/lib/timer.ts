export const timer = (ms: number) => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const set = (callback: (...args: any[]) => void, ...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, ms, ...args)
  };

  return {
    cancel: clearTimeout.bind(null, timer),
    set
  };
};