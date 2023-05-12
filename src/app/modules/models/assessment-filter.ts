export interface AssessmentFilter {
    pageSize: number;
    pageNumber: number;
    pageName: string,
    searchTerm: string;
    sortBy: string;
    sortColumn: string;
    filter: {
        tags?: string[];
        breachRisk?: string[];
        privacyRisk?: string[];
        accessPrivilege?: string[];
        dataByUsage?: string[];
    }
}
