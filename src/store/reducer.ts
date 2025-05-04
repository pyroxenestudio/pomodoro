import { COLORSCHEME } from "../components/color-scheme";
import InactiveNotification from "../utils/inactive-notification";

export enum MODE {
  'POMODORO',
  'BREAK',
  'LONGBREAK'
}

export type soundType = 'rocket' | 'cat' | 'dog';

export type ACTIONTYPE =
  | { type: "saveConfig"; payload: ISettings }
  | { type: 'mode'; payload: MODE }
  | { type: 'colorScheme'; payload: COLORSCHEME }
  | { type: 'countDownIsRunning'; payload: boolean }

export interface ISettings {
  pomodoro: number;
  break: number;
  longBreak: number;
  interval: number; // How many breaks between Long breaks. Ej: 1 would mean only one break. 
  sound: soundType
  volume: number;
}

export interface IStore extends ISettings {
  isRunning: boolean;
  mode?: MODE;
  inactiveNotification: InactiveNotification;
}

const inactiveNotification = new InactiveNotification();

export const defaultStore: IStore = {
  pomodoro: 30,
  break: 5,
  longBreak: 10,
  interval: 4,
  mode: MODE.POMODORO,
  sound: 'rocket',
  volume: 100,
  isRunning: false,
  inactiveNotification: inactiveNotification
}

export function settingsReducer(draft: IStore, action: ACTIONTYPE) {
  switch (action.type) {
    case 'saveConfig':
      return Object.assign({}, draft, action.payload);
    case 'mode':
      draft.mode = action.payload;
      break;
    case 'countDownIsRunning':
      draft.isRunning = action.payload;
      break;
    default:
      throw new Error("Action Not Found");
  }
}