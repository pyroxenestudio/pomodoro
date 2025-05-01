const DEV = import.meta.env.DEV
export const consoleError = function<T, S>(message: T, returnValue: S): S {
  if (DEV) console.error(message);
  return returnValue;
}

export const error = function(message: string) {
  throw new Error(message);
}