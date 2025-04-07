import { COLORSCHEME } from "../components/elements/color-scheme";

export enum MODE {
  'POMODORO',
  'BREAK',
  'LONGBREAK'
}

export type soundType = 'rocket' | 'cat' | 'dog';

export type ACTIONTYPE =
  | { type: "saveConfig"; payload: IStore }
  | { type: 'mode'; payload: MODE }
  | { type: 'colorScheme'; payload: COLORSCHEME }

export interface IStore {
  pomodoro: number;
  break: number;
  longBreak: number;
  interval: number; // How many breaks between Long breaks. Ej: 1 would mean only one break. 
  mode?: MODE;
  sound: soundType
  volume: number;
  colorScheme?: COLORSCHEME
}

export const defaultStore: IStore = {
  pomodoro: 30,
  break: 5,
  longBreak: 10,
  interval: 4,
  mode: MODE.POMODORO,
  sound: 'rocket',
  volume: 100,
  colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? COLORSCHEME.dark : COLORSCHEME.light
}

export function settingsReducer(draft: IStore, action: ACTIONTYPE) {
  switch (action.type) {
    case 'saveConfig':
      return Object.assign(draft, action.payload);
    case 'mode':
      draft.mode = action.payload;
      break;
    case 'colorScheme':
      draft.colorScheme = action.payload;
      break;
    default:
      throw new Error("Action Not Found");
  }
}