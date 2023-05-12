export interface LabelProps {
    key: string;
    color?: string;
    isChecked?: boolean;
    columnName?: string;
}

export interface BreachAssessmentFilters {
    breachRiskFilters: LabelProps[];
    accessPrivilegeFilters: LabelProps[];
    personalData: LabelProps[];
    tagFilters: LabelProps[];
}

export interface PrivacyAssessmentFilters {
    privacyRiskFilters: LabelProps[];
    accessPrivilegeFilters: LabelProps[];
    personalData: LabelProps[];
    tagFilters: LabelProps[];
}

export interface ColumnFilter {
    columnName: string;
    value: string;
}