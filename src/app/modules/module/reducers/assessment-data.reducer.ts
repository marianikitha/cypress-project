import { createReducer, on, Action } from '@ngrx/store';

import * as assessmentDataAction from '../actions/assessment-data.action';
import { AssessmentDataState } from '../states/assessment-data.state';

const initialState: AssessmentDataState = {
    assessmentData: {
        values: [],
        disableColumDetails: false,
        showExecutedUser: false,
        isLoading: true
    }
};

export const assessmentDataReducer = createReducer(
    initialState,
    on(assessmentDataAction.getAllAssessmentDataSuccess, (state, { assessmentData }) => {
        console.log(assessmentData)
        return {
            ...state,
            assessmentData: { ...assessmentData, isLoading: false }
        };
    }),
    on(assessmentDataAction.getAllAssessmentDataFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(assessmentDataAction.getAllAssessmentDatauseSuccess, (state, { assessmentData }) => {
        return {
            ...state,
            assessmentData: { ...assessmentData, isLoading: false }
        };
    }),
    on(assessmentDataAction.getAllAssessmentDatauseFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(assessmentDataAction.getAllAssessmentDataByUsageSuccess, (state, { assessmentData }) => {
        return {
            ...state,
            assessmentData: { ...assessmentData, isLoading: false }
        };
    }),
    on(assessmentDataAction.getAllAssessmentDataByUsageFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(assessmentDataAction.resetAssessmentData, (state) => {
        return {
            ...state,
            assessmentData: { values: [], disableColumDetails: false, showExecutedUser: false, isLoading: true }
        };
    })
);
