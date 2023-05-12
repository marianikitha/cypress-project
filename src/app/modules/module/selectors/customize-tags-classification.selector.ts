import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CustomizeTagsClassificationState } from '../states/customize-tags.state';
export const selectFeature = (state: AppState) => state.customizeTagsClassification;

export const selectAllTagsList = createSelector(
    selectFeature,
    (state: CustomizeTagsClassificationState) => state.tagList
);
export const selectAllClassificationList = createSelector(
    selectFeature,
    (state: CustomizeTagsClassificationState) => state.categoryList
);
