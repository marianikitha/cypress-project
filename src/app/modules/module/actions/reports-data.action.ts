import { createAction, props } from '@ngrx/store';
import { AssessmentFilter } from 'src/app/modules/models/assessment-filter';
import { LabelProps } from 'src/app/modules/models/data-filter';

// send email start
export const sendAssessmentDataReportInEmail = createAction(
    '[Report Data] Send Assessment Data Report In Email',
    props<{ data: { userName: string; email: string; pageName: string; type: string; } }>()
);

export const sendAssessmentDataReportInEmailSuccess = createAction(
    '[Report Data] Send Assessment Data Report In Email Success',
    props<{ data: { isDownloadButtonDisabled: boolean; } }>()
);

export const sendAssessmentDataReportInEmailFailure = createAction(
    '[Report Data] Send Assessment Data Report In Email Failure',
    props<{ error: any; }>()
);
// send email end

// total records start
export const getReportDataCount = createAction(
    '[Report Data] Get Report Data Count',
    props<{ reportFilter: AssessmentFilter; }>()
);

export const getReportDataCountSuccess = createAction(
    '[Report Data] Get Report Data Count Success',
    props<{ totalRecords: number; }>()
);

export const getReportDataCountFailure = createAction(
    '[Report Data] Get Report Data Count Failure',
    props<{ error: any; }>()
);
// total records end

// filters start
export const getReportDataFilters = createAction(
    '[Report Data] Get Report Data Filters',
    props<{ data: { filter: string; } }>()
);

export const getReportDataFiltersSuccess = createAction(
    '[Report Data] Get Report Data Filters Success',
    props<{
        filterData: {
            breachRiskFilters: [LabelProps];
            accessPrivilegeFilters: [LabelProps];
            personalData: [LabelProps];
            privacyRiskFilters: [LabelProps];
            tagFilters: [LabelProps];
            // accessPrivilegeFiltersForStale: [LabelProps];
            dataByUsageFilters: [LabelProps];

        }
    }>()
);

export const getReportDataFiltersFailure = createAction(
    '[Report Data] Get Report Data Filters Failure',
    props<{ error: any; }>()
);
// filters end

// column names start
export const getReportDataColumns = createAction(
    '[Report Data] Get Report Data Columns',
    props<{ data: { pageName: string; } }>()
);

export const getReportDataColumnsSuccess = createAction(
    '[Report Data] Get Report Data Columns Success',
    props<{
        columns: {
            isColumnLoading: boolean;
            columnData: [
                {
                    key: string;
                    type: string;
                    value: string;
                    children?: [{ key: string; type: string; value: string }];
                }
            ];
        }
    }>()
);

export const getReportDataColumnsFailure = createAction(
    '[Report Data] Get Report Data Columns Failure',
    props<{
        error: any; columns: {
            isColumnLoading: boolean
        }
    }>()
);
// column names end

export const resetReportsData = createAction(
    '[Report Data] Reset Reports Data'
);