import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AssessmentDataState } from '../states/assessment-data.state';

export const selectFeature = (state: AppState) => state.assessment;

export const selectAssessmentData = createSelector(selectFeature, (state: AssessmentDataState) => state.assessmentData);

export const selectAssessmentDataByUsage = createSelector(selectFeature, (state: AssessmentDataState) => state.assessmentData);
