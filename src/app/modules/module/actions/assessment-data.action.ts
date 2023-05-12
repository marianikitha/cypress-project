import { createAction, props } from '@ngrx/store';
// import { AssessmentData } from 'src/app/modules/core/models/assessment-data';
// import { AssessmentFilter } from 'src/app/modules/core/models/assessment-filter';
// import { createAction, props } from ''
import { AssessmentData } from 'src/app/modules/models/assessment-data'
import { AssessmentFilter } from 'src/app/modules/models/assessment-filter'

export const getAllAssessmentData = createAction(
    '[Assessment Data] Get All Assessment Data',
    props<{ assessmentFilter: AssessmentFilter; }>()
);

export const getAllAssessmentDataSuccess = createAction(
    '[Assessment Data] Get All Assessment Data Success',
    props<{
        assessmentData: {
            values: [AssessmentData];
            disableColumDetails: boolean;
            showExecutedUser: boolean;
            isLoading: boolean;
        };
    }>()
);

export const getAllAssessmentDataFailure = createAction(
    '[Assessment Data] Get All Assessment Data Failure',
    props<{ error: any; }>()
);

export const getAllAssessmentDatause = createAction(
    '[Assessment Data] Get All Assessment Datause',
    props<{ assessmentFilter: AssessmentFilter; }>()
);

export const getAllAssessmentDatauseSuccess = createAction(
    '[Assessment Data] Get All Assessment Datause Success',
    props<{
        assessmentData: {
            values: [AssessmentData];
            disableColumDetails: boolean;
            showExecutedUser: boolean;
            isLoading: boolean;
        };
    }>()
);

export const getAllAssessmentDatauseFailure = createAction(
    '[Assessment Data] Get All Assessment Datause Failure',
    props<{ error: any; }>()
);

export const resetAssessmentData = createAction(
    '[Assessment Data] Reset Assessment Data'
);

export const getAllAssessmentDataByUsage = createAction(
    '[Assessment Data] Get All Assessment Data By Usage',
    props<{ assessmentFilter: AssessmentFilter; }>()
);

export const getAllAssessmentDataByUsageSuccess = createAction(
    '[Assessment Data] Get All Assessment Data By Usage Success',
    props<{
        assessmentData: {
            values: [AssessmentData];
            disableColumDetails: boolean;
            isLoading: boolean;
        };
    }>()
);

export const getAllAssessmentDataByUsageFailure = createAction(
    '[Assessment Data] Get All Assessment Data By Usage Failure',
    props<{ error: any; }>()
);