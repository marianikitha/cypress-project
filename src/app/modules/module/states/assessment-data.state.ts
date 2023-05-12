import { AssessmentData } from 'src/app/modules/models/assessment-data';
import { AssessmentDatause } from 'src/app/modules/models/assessment-datause';


export interface AssessmentDataState {
    assessmentData: {
        values: AssessmentData[] | AssessmentDatause[] | [];
        disableColumDetails: boolean;
        showExecutedUser?: boolean;
        isLoading: boolean;
    };
}
