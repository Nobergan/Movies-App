import { createActionGroup, emptyProps } from '@ngrx/store';

export const HomeActions = createActionGroup({
  source: 'Home Page',
  events: {
    opened: emptyProps(),
    closed: emptyProps(),
  },
});
