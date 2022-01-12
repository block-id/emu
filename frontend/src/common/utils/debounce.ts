const debounce = <T extends AnyFunction>(func: T, time: number) => {
  let timeout: number | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);

    timeout = window.setTimeout(() => {
      func(...args);
    }, time);
  };
};

export default debounce;
