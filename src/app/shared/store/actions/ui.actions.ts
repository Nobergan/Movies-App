import { createActionGroup, props } from '@ngrx/store';

const featureName = 'UI';

export const UiActions = createActionGroup({
  source: featureName,
  events: {
    setIsSearchBlockVisible: props<{ isVisible: boolean }>(),
    setIsSearchBtnVisible: props<{ isVisible: boolean }>(),
    elementsScrollVisibilityChanged: props<{ isMobileMenuVisible: boolean }>(),
  },
});
