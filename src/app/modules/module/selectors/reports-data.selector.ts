import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';
import { ReportsDataState } from 'src/app/modules/module/states/reports-data.state';

export const selectFeature = (state: AppState) => state.reports;

export const selectIsDownloadButtonDisabledData = createSelector(selectFeature, (state: ReportsDataState) => state.isDownloadButtonDisabled);

export const selectTotalRecords = createSelector(selectFeature, (state: ReportsDataState) => state.totalRecords);

export const selectFilterData = createSelector(selectFeature, (state: ReportsDataState) => state.filterData);

export const selectColumnData = createSelector(selectFeature, (state: ReportsDataState) =>  state.columnDetails );