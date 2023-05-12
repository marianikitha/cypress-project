import { LabelProps } from 'src/app/modules/models/data-filter';

export interface ReportsDataState {

    filterData: {
        breachRiskFilters: LabelProps[] | [];
        accessPrivilegeFilters: LabelProps[] | [];
        personalData: LabelProps[] | [];
        privacyRiskFilters: LabelProps[] | [];
        tagFilters: LabelProps[] | [];
        // accessPrivilegeFiltersForStale: LabelProps[] | [];
        dataByUsageFilters: LabelProps[] | [];
    };
    totalRecords: number;
    isDownloadButtonDisabled?: boolean;
    columnDetails:{
        isColumnLoading: any;
        columnData: [
            {
                key: string;
                type: string;
                value: string;
                children?: [{ key: string; type: string; value: string }];
            }
        ] | [];
    }
}
