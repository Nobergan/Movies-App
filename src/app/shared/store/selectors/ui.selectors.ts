import { createSelector } from '@ngrx/store';

import { MainState, UiState } from '../state';

const selectUiState = (state: MainState) => state.ui;

const selectIsBlockSearchVisible = createSelector(selectUiState, (state: UiState) => state.isBlockSearchVisible);

const selectIsBtnSearchVisible = createSelector(selectUiState, (state: UiState) => state.isBtnSearchVisible);

const selectIsMobileMenuVisible = createSelector(selectUiState, (state: UiState) => state.isMobileMenuVisible);

export const UiSelectors = {
  selectIsBlockSearchVisible,
  selectIsBtnSearchVisible,
  selectIsMobileMenuVisible,
};
