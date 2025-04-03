export const styleTheme = {
  background: {
    level_0: 'bg-slate-100 dark:bg-slate-900',
    level_1: 'bg-slate-200 dark:bg-slate-800',
    level_2: 'bg-slate-300 dark:bg-slate-700',
    level_3: 'bg-slate-400 dark:bg-slate-600',
    level_4: 'bg-slate-500'
  },
  padding: {
    noPadding: '',
    small: 'p-1',
    normal: 'p-2',
    big: 'p-3'
  },
  margin: {
    noMargin: '',
    small: 'p-1',
    normal: 'p-2',
    big: 'p-3'
  },
  border: {
    radius: {
      noRadius: '',
      small: 'rounded-sm',
      normal: 'rounded-md',
      big: 'rounded-lg'
    },
    size: {
      small: 'border',
      normal: 'border-2',
      big: 'border-3'
    },
  },
  zIndex: {
    level_1: 'z-1',
    level_2: 'z-2',
    level_3: 'z-3',
    level_4: 'z-4',
    level_5: 'z-5'
  }
}
export interface IStyleTheme {
  background?: typeof styleTheme.background;
  padding?: typeof styleTheme.padding;
  margin?: typeof styleTheme.margin;
  border?: typeof styleTheme.border;
  zIndex?: typeof styleTheme.zIndex;
}