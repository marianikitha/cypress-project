import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';
import { ActionReducerMap } from '@ngrx/store';
// import { authReducer } from './reducers/auth.reducer';
// import { customizeDatasourceReducer } from './reducers/customize-datasource.reducer';
// import { actionsDataCatalogReducer } from './reducers/actions-data-catalog.reducer';
// import { dashboardReducer } from './reducers/dashboard.reducer';
import { assessmentDataReducer } from './reducers/assessment-data.reducer';
// import { sharedReducer } from './reducers/shared.reducer';
// import { customizePurposeReducer } from './reducers/customize-purpose.reducer';
// import { CustomizeTagsClassificationReducer } from './reducers/cutomize-tag-classification.reducer';
// import { globalSpinnerReducer } from './reducers/global-spinner.reducer';
// import { complianceRopaReducer } from './reducers/compliance-ropa.reducer';
// import { complianceDpiaReducer } from './reducers/compliance-dpia.reducer';
import { reportsDataReducer } from './reducers/report-data.reducer';
import { CustomizeTagsClassificationReducer } from './reducers/cutomize-tag-classification.reducer';
import { actionsDataCatalogReducer } from './reducers/actions-data-catalog.reducer';
// import { expectedDurationReducer } from './reducers/expected-duration.reducer';
// import { settingsNotificationReducer } from './reducers/settings-notification.reducer';
// import { settingsSchedulerReducer } from './reducers/settings-scheduler.reducer';
// import { batchDataReducer } from './reducers/batch.reducer';
// import { activityHistoryReducer } from './reducers/activity-history.reducer';
// import { datasourceReducer } from './reducers/datasource.reducer';
// import { chooseDatasourcesReducer } from './reducers/choose-datasources.reducer';
// import { choosePanelReducer } from './reducers/choose-panel.reducer';
// import { customizeReducer } from './reducers/customize-label.reducer';


export const AppReducers: ActionReducerMap<AppState> = {
    
   
    // auth: authReducer,
    // customizeDatasource: customizeDatasourceReducer,
    // actionsDataCatalog: actionsDataCatalogReducer,
    // dashboard: dashboardReducer,
    // router: routerReducer,
    assessment: assessmentDataReducer,
    actionsDataCatalog: actionsDataCatalogReducer,
    // ropa: complianceRopaReducer,
    // dpia: complianceDpiaReducer,
    // shared: sharedReducer,
    // customizePurpose: customizePurposeReducer,
    // customizeTagsClassification: CustomizeTagsClassificationReducer,
    // globalSpinner: globalSpinnerReducer,
    reports: reportsDataReducer,
    customizeTagsClassification: CustomizeTagsClassificationReducer,
    // expectedDuration: expectedDurationReducer,
    // settingsNotification: settingsNotificationReducer,
    // settingsScheduler: settingsSchedulerReducer,
    // batchDataState : batchDataReducer,
    // activityHistory : activityHistoryReducer,
    // datasource: datasourceReducer,
    // chooseDatasources: chooseDatasourcesReducer,
    // panel: choosePanelReducer,
    // defaultLabel: customizeReducer 
};
