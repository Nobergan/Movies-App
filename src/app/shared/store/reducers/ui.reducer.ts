import { createReducer, on } from '@ngrx/store';
import { UiState } from '@mm/shared/state';
import { UiActions } from '@mm/shared/actions';

export const uiReducer = createReducer<UiState>(
  {
    isBlockSearchVisible: false,
    isBtnSearchVisible: true,
    isMobileMenuVisible: true,
  },
  on(
    UiActions.setIsSearchBlockVisible,
    (state, action): UiState => ({
      ...state,
      isBlockSearchVisible: action.isVisible,
    }),
  ),
  on(
    UiActions.setIsSearchBtnVisible,
    (state, action): UiState => ({
      ...state,
      isBtnSearchVisible: action.isVisible,
    }),
  ),
  on(
    UiActions.elementsScrollVisibilityChanged,
    (state, action): UiState => ({
      ...state,
      isMobileMenuVisible: action.isMobileMenuVisible,
    }),
  ),
);
