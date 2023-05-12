// import { ActionsDataCatalogEffects } from './effects/actions-data-catalog.effect';
import { AssessmentDataEffects } from 'src/app/modules/module/effects/assessment-data.effect';
// import { AuthEffects } from './effects/auth.effect';
// import { CustomizeDatasourceEffects } from './effects/customize-datasource.effect';
// import { DashboardEffects } from './effects/dashboard.effect';
// import { SharedEffects } from './effects/shared.effect';
// import { CustomizePurposeEffects } from './effects/customize-purpose.effect';
// import { CustomizeTagsClassificationEffects } from './effects/cutomize-tag-classification.effects';
// import { ComplianceRopaEffects } from './effects/compliance-ropa.effect';
// import { ComplianceDpiaEffects } from './effects/compliance-dpia.effect ';
// import { ExpectedDurationEffects } from './effects/expected-duration.effect';
// import { SettingsNotificationEffects } from './effects/settings-notification.effect';
// import { SettingsSchedulerEffects } from './effects/settings-scheduler.effect';
// import { BatchDataEffects } from './effects/batch.effect';
// import { ActivityHistoryEffects } from './effects/activity-history.effect';
import { ReportsDataEffects } from 'src/app/modules/module/effects/reports-data.effect';
import { CustomizeTagsClassificationEffects } from './effects/cutomize-tag-classification.effects';
import { ActionsDataCatalogEffects } from './effects/actions-data-catalog.effect';
// import { ChooseDatasourcesEffects } from './effects/choose-datasource.effect';
// import { CustomizeLabelEffects } from './effects/customize-label.effect';

export const AppEffects: any = [
    
    // AuthEffects,
    // CustomizeDatasourceEffects,
    // CustomizePurposeEffects,
    // ActionsDataCatalogEffects,
    AssessmentDataEffects,
    CustomizeTagsClassificationEffects,
    // DashboardEffects,
    // SharedEffects,
    // CustomizeTagsClassificationEffects,
    // ComplianceRopaEffects,
    // ComplianceDpiaEffects,
    ReportsDataEffects,  
    ActionsDataCatalogEffects
    // ExpectedDurationEffects,
    // SettingsNotificationEffects,
    // SettingsSchedulerEffects,
    // ReportsDataEffects,
    // BatchDataEffects,
    // ActivityHistoryEffects,
    // ChooseDatasourcesEffects,
    // CustomizeLabelEffects
];
