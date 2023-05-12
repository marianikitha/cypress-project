import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActionsDataCatalogState } from '../states/actions-data-catalog.state';

export const selectFeature = (state: AppState) => state.actionsDataCatalog;

export const selectAllCountries = createSelector(
    selectFeature,
    (state: ActionsDataCatalogState) => state.countriesList
);

export const selectAllEuCountries = createSelector(
    selectFeature,
    (state: ActionsDataCatalogState) => state.euCountriesList
);

export const selectAllStates = createSelector(selectFeature, (state: ActionsDataCatalogState) => state.statesList);

export const selectAllSourcePurpose = createSelector(
    selectFeature,
    (state: ActionsDataCatalogState) => state.sourcePurposeList
);

export const selectAllSubjectType = createSelector(
    selectFeature,
    (state: ActionsDataCatalogState) => state.subjectTypeList
);

export const selectTreeData = createSelector(selectFeature, (state: ActionsDataCatalogState) => state.tree);

export const selectDataDetails = createSelector(selectFeature, (state: ActionsDataCatalogState) => state.dataDetails);

export const selectMetadata = createSelector(selectFeature, (state: ActionsDataCatalogState) => state.metaData);

export const selectAdUsers = createSelector(selectFeature, (state: ActionsDataCatalogState) => state.adUsers);

export const selectUsersWithAccess = createSelector(selectFeature, (state: ActionsDataCatalogState) => state.usersWithAccess);