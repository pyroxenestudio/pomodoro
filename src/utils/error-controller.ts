export const consoleError = function<T, S>(message: T, returnValue?: S): S | boolean {
  console.error(message);
  if (returnValue === undefined) {
    return false;
  }
  return returnValue;
}

export const error = function(message: string) {
  throw new Error(message);
}