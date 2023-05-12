export interface AssessmentData {
    //Breach
    dataasset: string[];
    financialImpactInDollars: string;
    totalRows: number;
    riskScore: number;
    breachRisk: string;
    tags: string[];
    personalData: string;
    accessPrivilege: string;
    breachRecommendedAction: string[];
    usersWithAccess: number;
    activeUsers: number;
    activeUsersPercentage: number;
    dataOwner: string;
    //Data By Usage
    dataByUsage?: string;
    daysSinceLastActivity?: string;
    lastUsedBy?: string[];
    last90DaysActivityCount?: string;
    last90DaysActiveUsersCount?: string;
    //Privacy
    sourcePurpose: string;
    privacyExposure: number;
    privacyRisk: string;
    privacyRecommendedAction: string[];
}
