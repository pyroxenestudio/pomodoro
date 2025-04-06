export const styleTheme = {
  background: {
    level_0: 'bg-slate-100 dark:bg-slate-900',
    level_1: 'bg-slate-200 dark:bg-slate-800',
    level_2: 'bg-slate-300 dark:bg-slate-700',
    level_3: 'bg-slate-400 dark:bg-slate-600',
    level_4: 'bg-slate-500'
  },
  padding: {
    no: 'p-0',
    small: 'p-1',
    normal: 'p-2',
    big: 'p-3'
  },
  margin: {
    no: 'm-0',
    small: 'm-1',
    normal: 'm-2',
    big: 'm-3'
  },
  border: {
    radius: {
      no: 'rounded-none',
      small: 'rounded-sm',
      normal: 'rounded-md',
      big: 'rounded-lg'
    },
    size: {
      small: 'border',
      normal: 'border-2',
      big: 'border-3'
    },
    color: {
      light: 'border-slate-300 focus:border-slate-700',
      dark: 'dark:border-slate-700 dark:focus:border-slate-300'
    }
  },
  zIndex: {
    level_1: 'z-1',
    level_2: 'z-2',
    level_3: 'z-3',
    level_4: 'z-4',
    level_5: 'z-5'
  },
  font: {
    weight: {
      verySmall: 'font-thin',
      small: 'font-extralight',
      normal: 'font-normal',
      big: 'font-semibold'
    },
    color: {
      light: 'text-slate-700 ',
      dark: 'dark:text-slate-300'
    }
  }
}
export interface IStyleTheme {
  background?: keyof typeof styleTheme.background;
  padding?: keyof typeof styleTheme.padding;
  margin?: keyof typeof styleTheme.margin;
  border?: {
    radius?: keyof typeof styleTheme.border.radius;
    size?: keyof typeof styleTheme.border.radius;
    color?: keyof typeof styleTheme.border.color;
  };
  zIndex?: keyof typeof styleTheme.zIndex;
  font?: {
    weight: typeof styleTheme.font.weight;
    color: typeof styleTheme.font.color;
  }
}