import { createAction, props } from '@ngrx/store';
import { Country } from 'src/app/modules/models/country';
import { DataLocation } from 'src/app/modules/models/location';
import { Retention } from 'src/app/modules/models/retention';
import { SourcePurpose } from 'src/app/modules/models/source-purpose';
import { State } from 'src/app/modules/models/state';
import { SubjectType } from 'src/app/modules/models/subject-type';
import { DataDetails } from 'src/app/modules/models/data-details';
import { MetaData } from 'src/app/modules/models/metadata';
import { AdUsers } from 'src/app/modules/models/ad-users';
import { TreeData } from 'src/app/modules/models/tree-data';
import { Users } from 'src/app/modules/models/users';

export const getTreeData = createAction(
    '[Actions Data Catalog] Get Tree Data',
    props<{ data: { datasourcePath: string[]; pageSize: number; pageNumber: number } }>()
);

export const getTreeDataSuccess = createAction(
    '[Actions Data Catalog] Get Tree Data Success',
    props<{ tree: { type: string; data: TreeData[] } }>()
);

export const getTreeDataFailure = createAction('[Actions Data Catalog] Get Tree Data Failure', props<{ error: any }>());

export const clearTreeData = createAction(
    '[Actions Data Catalog] Clear Tree Data',
);

export const getTreeDataBySearchKeyword = createAction('[Actions Data Catalog] Get Tree Data By Search Keyword',
    props<{ data: { keyword: string; pageSize: number; pageNumber: number } }>()
);

export const getTreeDataBySearchKeywordSuccess = createAction(
    '[Actions Data Catalog] Get Tree Data By Search Keyword Success',
    props<{ tree: { type: string; data: TreeData[] } }>()
);

export const getTreeDataBySearchKeywordFailure = createAction(
    '[Actions Data Catalog] Get Tree Data By Search Keyword Failure',
    props<{ error: any }>()
);

export const getDataDetails = createAction(
    '[Actions Data Catalog] Get Data Details',
    props<{ data: { datasourcePath: string[]; dataassetId: string | null } }>()
);

export const getDataDetailsSuccess = createAction(
    '[Actions Data Catalog] Get Data Details Success',
    props<{ dataDetails: DataDetails }>()
);

export const getDataDetailsFailure = createAction(
    '[Actions Data Catalog] Get Data Details Failure',
    props<{ error: any }>()
);

export const clearDataDetails = createAction(
    '[Actions Data Catalog] Clear Data Details',
);

export const getMetadata = createAction(
    '[Actions Data Catalog] Get Metadata',
    props<{ data: { datasourcePath: string[]; dataassetId: string | null } }>()
);

export const getMetadataSuccess = createAction(
    '[Actions Data Catalog] Get Metadata Success',
    props<{ metaData: MetaData }>()
);

export const getMetadataFailure = createAction('[Actions Data Catalog] Get Metadata Failure', props<{ error: any }>());


export const clearMetadata = createAction(
    '[Actions Data Catalog] Clear Metadata',
);

export const getUsersWithAccess = createAction(
    '[Actions Data Catalog] Get User With Access',
    props<{ data: { datasourcePath: string; dataassetId: string | null; } }>()
);

export const clearUsersWithAccess = createAction(
    '[Actions Data Catalog] Clear User With Access',
);

export const getUsersWithAccessSuccess = createAction(
    '[Actions Data Catalog] Get User With Access Success',
    props<{ usersWithAccess:  Users[]; }>()
    // props<{ usersWithAccess: { users: Users[]; } }>()
);
export const getUsersWithAccessFailure = createAction('[Actions Data Catalog] Get User With Access Failure', props<{ error: any }>());

export const getAdUsers = createAction('[Actions Data Catalog] Get Ad Users',
    props<{ data: { authProviderName: string, clientId: string, tenantId: string } }>());

export const getAdUsersSuccess = createAction(
    '[Actions Data Catalog] Get Ad Users Success',
    props<{ adUsers: [AdUsers] }>()
);

export const getAdUsersFailure = createAction('[Actions Data Catalog] Get Ad Users Failure', props<{ error: any }>());

export const getAllSourcePurpose = createAction('[Actions Data Catalog] Get All Source Purpose');

export const getAllSourcePurposeSuccess = createAction(
    '[Actions Data Catalog] Get All Source Purpose Success',
    props<{ sourcePurposeList: [SourcePurpose] }>()
);

export const getAllSourcePurposeFailure = createAction(
    '[Actions Data Catalog] Get All Source Purpose Failure',
    props<{ error: any }>()
);

export const getAllSubjectType = createAction('[Actions Data Catalog] Get All Subject Type');

export const getAllSubjectTypeSuccess = createAction(
    '[Actions Data Catalog] Get All Subject Type Success',
    props<{ subjectTypeList: [SubjectType] }>()
);

export const getAllSubjectTypeFailure = createAction(
    '[Actions Data Catalog] Get All Subject Type Failure',
    props<{ error: any }>()
);

export const getAllCountries = createAction('[Actions Data Catalog] Get All Countries');

export const getAllCountriesSuccess = createAction(
    '[Actions Data Catalog] Get All Countries Success',
    props<{ country: [Country] }>()
);

export const getAllCountriesFailure = createAction(
    '[Actions Data Catalog] Get All Countries Failure',
    props<{ error: any }>()
);

export const getAllEuCountries = createAction('[Actions Data Catalog] Get All Eu Countries');

export const getAllEuCountriesSuccess = createAction(
    '[Actions Data Catalog] Get All Eu Countries Success',
    props<{ eucountry: [Country] }>()
);

export const getAllEuCountriesFailure = createAction(
    '[Actions Data Catalog] Get All Eu Countries Failure',
    props<{ error: any }>()
);

export const getAllStates = createAction('[Actions Data Catalog] Get All States');

export const getAllStatesSuccess = createAction(
    '[Actions Data Catalog] Get All States Success',
    props<{ states: [State] }>()
);

export const getAllStatesFailure = createAction(
    '[Actions Data Catalog] Get All States Failure',
    props<{ error: any }>()
);

export const getAllDataSourcePurpose = createAction('[Actions Data Catalog] Get All Data Source Purpose');

export const getAllDataSourcePurposeSuccess = createAction(
    '[Actions Data Catalog] Get All Data Source Purpose Success',
    props<{ sourcePurpose: SourcePurpose }>()
);

export const getAllDataSourcePurposeFailure = createAction(
    '[Actions Data Catalog] Get All Data Source Purpose Failure',
    props<{ error: any }>()
);

export const getAllDataSubjectType = createAction('[Actions Data Catalog] Get All Data Subject Type');

export const getAllDataSubjectTypeSuccess = createAction(
    '[Actions Data Catalog] Get All Data Subject Type Success',
    props<{ subjectType: [SubjectType] }>()
);

export const getAllDataSubjectTypeFailure = createAction(
    '[Actions Data Catalog] Get All Data Subject Type Failure',
    props<{ error: any }>()
);

export const addDataOwner = createAction(
    '[Customize Data Catalog] Add Data Owner',
    props<{ data: { datasourcePath: string[]; dataOwner: string; dataassetId: string | null } }>()
);

export const addDataOwnerSuccess = createAction(
    '[Customize Data Catalog] Add Data Owner Success',
    props<{ data: { datasourcePath: string[]; dataOwner: string } }>()
);

export const addDataOwnerFailure = createAction(
    '[Customize Data Catalog] Add Data Owner Failure',
    props<{ error: any }>()
);

export const addDataSourcePurpose = createAction(
    '[Customize Data Catalog] Add Data Source Purpose',
    props<{ data: { datasourcePath: string[]; sourcePurpose: SourcePurpose; dataassetId: string | null } }>()
);

export const addDataSourcePurposeSuccess = createAction(
    '[Customize Data Catalog] Add Data Source Purpose Success',
    props<{ data: { datasourcePath: string[]; sourcePurpose: SourcePurpose } }>()
);

export const addDataSourcePurposeFailure = createAction(
    '[Customize Data Catalog] Add Data Source Purpose Failure',
    props<{ error: any }>()
);

export const addDataSubjectType = createAction(
    '[Customize Data Catalog] Add Data Subject Type',
    props<{ data: { datasourcePath: string[]; subjectType: SubjectType; dataassetId: string | null } }>()
);

export const addDataSubjectTypeSuccess = createAction(
    '[Customize Data Catalog] Add Data Subject Type Success',
    props<{ data: { datasourcePath: string[]; subjectType: SubjectType } }>()
);

export const addDataSubjectTypeFailure = createAction(
    '[Customize Data Catalog] Add Data Subject Type Failure',
    props<{ error: any }>()
);

export const addDataLocation = createAction(
    '[Customize Data Catalog] Add Data Location',
    props<{ data: { datasourcePath: string[]; location: DataLocation; dataassetId: string | null } }>()
);

export const addDataLocationSuccess = createAction(
    '[Customize Data Catalog] Add Data Location Success',
    props<{ data: { datasourcePath: string[]; location: DataLocation } }>()
);

export const addDataLocationFailure = createAction(
    '[Customize Data Catalog] Add Data Location Failure',
    props<{ error: any }>()
);

export const addDataRetention = createAction(
    '[Customize Data Catalog] Add Data Retention',
    props<{ data: { datasourcePath: string[]; retention: Retention; dataassetId: string | null } }>()
);

export const addDataRetentionSuccess = createAction(
    '[Customize Data Catalog] Add Data Retention Success',
    props<{ data: { datasourcePath: string[]; retention: Retention } }>()
);

export const addDataRetentionFailure = createAction(
    '[Customize Data Catalog] Add Data Retention Failure',
    props<{ error: any }>()
);

export const addDataHasMinorInformation = createAction(
    '[Customize Data Catalog] Add Data Has Minor Information',
    props<{
        data: { datasourcePath: string[]; hasMinorData: boolean | null; dataassetId: string | null };
    }>()
);

export const addDataHasMinorInformationSuccess = createAction(
    '[Customize Data Catalog] Add Data Has Minor Information Success',
    props<{
        data: { datasourcePath: string[]; hasMinorData: boolean | null };
    }>()
);

export const addDataHasMinorInformationFailure = createAction(
    '[Customize Data Catalog] Add Data Has Minor Information Failure',
    props<{ error: any }>()
);

export const deleteDataSourcePurpose = createAction(
    '[Customize Data Catalog] Delete Data Source Purpose',
    props<{ data: { datasourcePath: string[]; sourcePurpose: SourcePurpose; dataassetId: string | null } }>()
);

export const deleteDataSourcePurposeSuccess = createAction(
    '[Customize Data Catalog] Delete Data Source Purpose Success',
    props<{ data: { datasourcePath: string[]; sourcePurpose: SourcePurpose } }>()
);

export const deleteDataSourcePurposeFailure = createAction(
    '[Customize Data Catalog] Delete Data Source Purpose Failure',
    props<{ error: any }>()
);

export const deleteDataLocation = createAction(
    '[Customize Data Catalog] Delete Data Location',
    props<{ data: { datasourcePath: string[]; location: DataLocation; dataassetId: string | null } }>()
);

export const deleteDataLocationSuccess = createAction(
    '[Customize Data Catalog] Delete Data Location Success',
    props<{ data: { datasourcePath: string[]; location: DataLocation } }>()
);

export const deleteDataLocationFailure = createAction(
    '[Customize Data Catalog] Delete Data Location Failure',
    props<{ error: any }>()
);

export const deleteDataSubjectType = createAction(
    '[Customize Data Catalog] Delete Data Subject Type',
    props<{ data: { datasourcePath: string[]; subjectType: SubjectType; dataassetId: string | null } }>()
);

export const deleteDataSubjectTypeSuccess = createAction(
    '[Customize Data Catalog] Delete Data Subject Type Success',
    props<{ data: { datasourcePath: string[]; subjectType: SubjectType } }>()
);

export const deleteDataSubjectTypeFailure = createAction(
    '[Customize Data Catalog] Delete Data Subject Type Failure',
    props<{ error: any }>()
);
