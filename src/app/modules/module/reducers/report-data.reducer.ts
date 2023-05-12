import { createReducer, on } from '@ngrx/store';

import * as reportsDataAction from '../actions/reports-data.action';
import { ReportsDataState } from '../states/reports-data.state';

const initialState: ReportsDataState = {
    filterData: {
        breachRiskFilters: [],
        accessPrivilegeFilters: [],
        personalData: [],
        privacyRiskFilters: [],
        tagFilters: [],
        // accessPrivilegeFiltersForStale: [],
        dataByUsageFilters: []
    },
    totalRecords: 0,
    columnDetails: {
        isColumnLoading: null,
        columnData: [
            {
                key: '',
                type: '',
                value: '',
                children: [{ key: '', type: '', value: '', }]
            }
        ],
    },
    isDownloadButtonDisabled: false
};

export const reportsDataReducer = createReducer(
    initialState,
    on(reportsDataAction.sendAssessmentDataReportInEmailSuccess, (state, { data }) => {
        return {
            ...state,
            isDownloadButtonDisabled: data.isDownloadButtonDisabled
        }
    }),
    on(reportsDataAction.sendAssessmentDataReportInEmailFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(reportsDataAction.getReportDataCountSuccess, (state, { totalRecords }) => {
        console.log(totalRecords)
        return {
            ...state,
            totalRecords: totalRecords
        };
    }),
    on(reportsDataAction.getReportDataCountFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(reportsDataAction.getReportDataFiltersSuccess, (state, { filterData }) => {
        console.log(filterData)
        if (Object.keys(filterData).length == 1) {
            return {
                ...state,
                filterData: { ...state.filterData, tagFilters: filterData.tagFilters }
            }
        }
        else {
            return {
                ...state,
                filterData: filterData
            }
        }
    }),
    on(reportsDataAction.getReportDataCountFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(reportsDataAction.getReportDataColumnsSuccess, (state, { columns }) => {
        return {
            ...state,
            columnDetails: columns
        };
    }),
    on(reportsDataAction.getReportDataColumnsFailure, (state, { error }) => {
        return {
            ...state,
            columnDetails: { ...state.columnDetails, isColumnLoading: true }
        };
    }),
    on(reportsDataAction.resetReportsData, (state) => {
        return {
            ...state,
            totalRecords: 0,
            columnData: [],
            isDownloadButtonDisabled: false
        };
    })

);
