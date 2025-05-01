import { consoleError } from "../utils/error-controller"

export default function() {
  function getValue<T>(name: string): T | null {
    if (name === undefined || name === '') consoleError('name is empty', null);

    const value = localStorage.getItem(name);
    let parseValue: T | {value: T, expireDate: number} | null = null;

    if (value) {

      parseValue = JSON.parse(value);
      if (parseValue !== null) {
        if (typeof parseValue === 'object' && 'expireDate' in parseValue && parseValue.expireDate) {
          if (checkDate(new Date(parseValue.expireDate))) {
            return parseValue.value;
          } else {
            remove(name);
          }
        } else {
          return parseValue as T;
        }
      }
    }
    return null;
  }

  function save<T>(name: string, value: T, expireDate?: Date): boolean {
    if (name === undefined || name === '') return consoleError('name is empty', false);
    if (value === undefined) return consoleError('value is empty', false);

    if (expireDate) {
      localStorage.setItem(name, JSON.stringify({value, expireDate: expireDate.valueOf()}));
    } else {
      localStorage.setItem(name, JSON.stringify(value));
    }
    return true;
  }

  function remove(name: string): boolean {
    if (name === undefined || name === '') return consoleError('remove,name is empty', false);
    localStorage.removeItem(name);
    return true;
  }

  function checkDate(date: Date) {
    if (!date) return false;
    date = new Date(date);
    const today = new Date();

    if (date < today) {
      return false;
    }
    return true;
  }

  return {
    save,
    getValue,
    remove
  }
}