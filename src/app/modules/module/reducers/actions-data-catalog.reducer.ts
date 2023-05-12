import { createReducer, on, Action } from '@ngrx/store';
// import { LoadMore, TreeData } from 'src/app/modules/core/models/tree-data';

import * as actionsDataCatalogAction from '../actions/actions-data-catalog.action';
import { ActionsDataCatalogState } from '../states/actions-data-catalog.state';
import { TreeData } from '../../models/tree-data';

const initialState: ActionsDataCatalogState = {
    tree: {
        data: [],
        type: ''
    },
    sourcePurposeList: [],
    subjectTypeList: [],
    countriesList: [],
    euCountriesList: [],
    statesList: [],
    dataDetails: {
        isValid: false,
        disableColumDetails: false,
        datasourcePath: [],
        type: '',
        category: [],
        tags: [],
        dataOwner: [],
        recentOwners: [],
        dataassetDelimiter: ''
    },
    metaData: {
        datasourcePath: [],
        sourcePurpose: [],
        location: [],
        retention: { type: '', duration: 0 },
        subjectType: [],
        hasMinorData: false,
    },
    // usersWithAccess: {
    //     users: []
    // },
    usersWithAccess: [],
    adUsers: []
};

const stringify = (data: any) => {
    return JSON.stringify(data);
};

const treeDataFormation = (partialData: any) => {
    let children: TreeData[] = partialData.children.map((item: any) => {
        let parent: string = '',
            datasourcePath = [];
        if (partialData.datasourcePath.length > 0) {
            parent = partialData.datasourcePath[partialData.datasourcePath.length - 1];
            datasourcePath = partialData.datasourcePath.concat(item.name);
        } else {
            datasourcePath = [item.name];
        }
        let children: any = [];
        if (!item?.dataassetId) {            
            if (item.totalChildrenCount>0) {
                let loadMore = {
                    name: 'LOAD_MORE',
                    datasourcePath: datasourcePath,
                    pageSize: partialData.pageSize,
                    pageNumber: 0,
                    dataassetId: null
                };
                children.push(loadMore);
            }
        }
        return {
            name: item.name,
            parent: parent,
            datasourcePath: datasourcePath,
            children: children,
            dataassetId: item?.dataassetId || null,
            history: item.history == true || item.history == undefined ? false : true
        };
    });

    let nextPageSize = partialData.pageNumber * partialData.pageSize;
    if (nextPageSize < partialData.totalChildrenCount) {
        let loadMore: any = {
            name: 'LOAD_MORE',
            datasourcePath: partialData.datasourcePath,
            pageSize: partialData.pageSize,
            pageNumber: partialData.pageNumber,
            dataassetId: null
        };
        children = [...children, loadMore];
    } else {
        children = [...children];
    }

    return children;
};

const searchTreeDataFormation = (partialData: any, datasourcePath: string[] = []) => {
    let children: TreeData[] = partialData.children.map((item: any, index: number) => {
        item.parent = partialData.name;
        item.datasourcePath = [...datasourcePath, item.name];
        if (item.children.length > 0) {
            item.nestedChildren = searchTreeDataFormation(item, item.datasourcePath);
        }
        return {
            name: item.name || '',
            parent: item.parent || '',
            datasourcePath: item.datasourcePath || [],
            children: item.nestedChildren || [],
            dataassetId: item?.dataassetId || null,
            history: item.history == true || item.history == undefined ? false : true
        };
    });
    datasourcePath = [];
    return children;
};

export const idenfityAndPatchTreeNode = async (datasource: TreeData, dataToPatch: any, path: string[]) => {
    if (!datasource) {
        return datasource;
    }
    if (path.length === 0) {
        if (datasource.children && datasource.children.length) {
            let len = datasource.children.length - 1;
            if (datasource.children[len]?.name === 'LOAD_MORE') datasource.children.splice(len, 1);
        }
        if (dataToPatch.length > 0) {
            datasource.children = [...datasource.children, ...dataToPatch];
        } else {
            if (!datasource.children) datasource.children = dataToPatch;
            else datasource.children = [...datasource.children, ...dataToPatch];
        }
        return datasource;
    }
    if (datasource.children.find((item) => item.name === path[0])) {
        for (let i of datasource.children) {
            if (i.name === path[0]) {
                idenfityAndPatchTreeNode(i, dataToPatch, path.slice(1));
            }
        }
    }
    return datasource;
};

export const identifyDatasourcePosition = (datasources: TreeData[], datasourceName: string) => {
    return datasources.findIndex((item) => item.name === datasourceName);
};

export const patchTreeData = (datasources: TreeData[], partialData: any) => {
    let partialDatasourceName = partialData.datasourcePath[0];
    let filteredDatasource: number = identifyDatasourcePosition(datasources, partialDatasourceName);
    if (filteredDatasource >= 0) {
        let formatTreeStructure: any = [];
        if (partialData.children.length) formatTreeStructure = treeDataFormation(partialData);
        idenfityAndPatchTreeNode(
            datasources[filteredDatasource],
            formatTreeStructure,
            partialData.datasourcePath.slice(1)
        );
    }
    return datasources;
};

export const actionsDataCatalogReducer = createReducer(
    initialState,
    on(actionsDataCatalogAction.getTreeDataSuccess, (state, { tree }) => {
        let datasources = [...state.tree.data];
        let partialData = tree;
        let modifiedData: any = [];

        datasources = JSON.parse(JSON.stringify(datasources));
        if (state.tree.type === 'search') {
            let formatTreeStructure = treeDataFormation(partialData);
            modifiedData = [...formatTreeStructure];
        } else {
            if (datasources.length == 0) {
                let formatTreeStructure = treeDataFormation(partialData);
                modifiedData = [...formatTreeStructure];
            } else {
                let newTree = patchTreeData(datasources, partialData);
                modifiedData = [...newTree];
            }
        }

        let result = { type: 'default', data: [...modifiedData] };

        return {
            ...state,
            tree: { ...result }
        };
    }),
    on(actionsDataCatalogAction.getTreeDataFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.clearTreeData, (state) => {
        return {
            ...state,
            tree: { data: [], type: '' }
        };
    }),
    on(actionsDataCatalogAction.getTreeDataBySearchKeywordSuccess, (state, { tree }) => {
        let dataStringify = JSON.stringify(tree);
        let partialData: any = JSON.parse(dataStringify);
        let modifiedData: any = [];
        let previousPage: any, nextPage: any;

        if (partialData.pageNumber > 0) {
            previousPage = {
                name: 'PREVIOUS_PAGE_LOAD_MORE',
                pageSize: partialData.pageSize,
                pageNumber: partialData.pageNumber - 1,
                dataassetId: null
            };
        }

        let nextPageSize = (partialData.pageNumber + 1) * partialData.pageSize;
        if (nextPageSize < partialData.totalChildrenCount) {
            nextPage = {
                name: 'NEXT_PAGE_LOAD_MORE',
                pageSize: partialData.pageSize,
                pageNumber: partialData.pageNumber + 1,
                dataassetId: null
            };
        }
        if (previousPage) {
            modifiedData = [...[previousPage]];
        }
        let formatTreeStructure = searchTreeDataFormation(partialData);

        modifiedData = [...modifiedData, ...formatTreeStructure];
        if (nextPage) {
            modifiedData = [...modifiedData, ...[nextPage]];
        }

        let result = { type: 'search', data: [...modifiedData] };

        return {
            ...state,
            tree: { ...result }
        };
    }),
    on(actionsDataCatalogAction.getTreeDataBySearchKeywordFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.getAllSourcePurposeSuccess, (state, { sourcePurposeList }) => {
        return {
            ...state,
            sourcePurposeList: sourcePurposeList
        };
    }),
    on(actionsDataCatalogAction.getAllSourcePurposeFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.getAllSubjectTypeSuccess, (state, { subjectTypeList }) => {
        return {
            ...state,
            subjectTypeList: subjectTypeList
        };
    }),
    on(actionsDataCatalogAction.getAllSubjectTypeFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.getAllCountriesSuccess, (state, { country }) => {
        return {
            ...state,
            countriesList: country
        };
    }),
    on(actionsDataCatalogAction.getAllCountriesFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.getAllEuCountriesSuccess, (state, { eucountry }) => {
        return {
            ...state,
            euCountriesList: eucountry
        };
    }),
    on(actionsDataCatalogAction.getAllEuCountriesFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.getAllStatesSuccess, (state, { states }) => {
        return {
            ...state,
            statesList: states
        };
    }),
    on(actionsDataCatalogAction.getAllStatesFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.getDataDetailsSuccess, (state, { dataDetails }) => {
        return {
            ...state,
            dataDetails: dataDetails
        };
    }),
    on(actionsDataCatalogAction.getDataDetailsFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.getMetadataSuccess, (state, { metaData }) => {
        return {
            ...state,
            metaData: metaData
        };
    }),
    on(actionsDataCatalogAction.getMetadataFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.getUsersWithAccessSuccess, (state, { usersWithAccess }) => {
        return {
            ...state,
            usersWithAccess: usersWithAccess
        };
    }),
    on(actionsDataCatalogAction.getUsersWithAccessFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.clearUsersWithAccess, (state) => {
        return {
            ...state,
            usersWithAccess: []
        };
    }),
    on(actionsDataCatalogAction.clearDataDetails, (state) => {
        return {
            ...state,
            dataDetails: {
                isValid: false,
                disableColumDetails: false,
                datasourcePath: [],
                type: '',
                category: [],
                tags: [],
                dataOwner: [],
                recentOwners: [],
                dataassetDelimiter: ''
            },
        };
    }),
    on(actionsDataCatalogAction.clearMetadata, (state) => {
        return {
            ...state,
            metaData: {
                datasourcePath: [],
                sourcePurpose: [],
                location: [],
                retention: { type: '', duration: 0 },
                subjectType: [],
                hasMinorData: false,
            }
        };
    }),
    on(actionsDataCatalogAction.getAdUsersSuccess, (state, { adUsers }) => {
        return {
            ...state,
            adUsers: adUsers
        };
    }),
    on(actionsDataCatalogAction.getAdUsersFailure, (state, { error }) => {
        return {
            ...state
        };
    }),

    on(actionsDataCatalogAction.addDataOwnerSuccess, (state, { data }) => {
        let dataDetails = { ...state.dataDetails };
        dataDetails.dataOwner = [data.dataOwner];
        return {
            ...state,
            dataDetails: dataDetails
        };
    }),
    on(actionsDataCatalogAction.addDataOwnerFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.addDataSourcePurposeSuccess, (state, { data }) => {
        let metaData = { ...state.metaData };
        let sourcePurposeExists = metaData.sourcePurpose.filter(
            (item) => item.sourcePurposeId === data.sourcePurpose.sourcePurposeId
        );
        if (!sourcePurposeExists.length) {
            metaData.sourcePurpose = [...metaData.sourcePurpose, data.sourcePurpose];
        }
        return {
            ...state,
            metaData: metaData
        };
    }),
    on(actionsDataCatalogAction.addDataSourcePurposeFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.addDataSubjectTypeSuccess, (state, { data }) => {
        let metaData = { ...state.metaData };
        let subjectTypeExists = metaData.subjectType.filter(
            (item) => item.subjectTypeId === data.subjectType.subjectTypeId
        );
        if (!subjectTypeExists.length) {
            metaData.subjectType = [...metaData.subjectType, data.subjectType];
        }
        return {
            ...state,
            metaData: metaData
        };
    }),
    on(actionsDataCatalogAction.addDataSubjectTypeFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.addDataLocationSuccess, (state, { data }) => {
        let metaData = { ...state.metaData };
        let locationExists = metaData.location.filter(
            (item) => item.country === data.location.country && item.state === data.location.state
        );
        if (!locationExists.length) {
            metaData.location = [...metaData.location, data.location];
        }
        return {
            ...state,
            metaData: metaData
        };
    }),
    on(actionsDataCatalogAction.addDataLocationFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.addDataRetentionSuccess, (state, { data }) => {
        let metaData = { ...state.metaData };
        metaData.retention = { ...data.retention };
        return {
            ...state,
            metaData: metaData
        };
    }),
    on(actionsDataCatalogAction.addDataRetentionFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.addDataHasMinorInformationSuccess, (state, { data }) => {
        let metaData = { ...state.metaData };
        metaData.hasMinorData = data.hasMinorData;
        return {
            ...state,
            metaData: metaData
        };
    }),
    on(actionsDataCatalogAction.addDataHasMinorInformationFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.deleteDataSourcePurposeSuccess, (state, { data }) => {
        let metaData = { ...state.metaData };
        let removedSourcePurpose = metaData.sourcePurpose.filter((item) => {
            return item.sourcePurposeId !== data.sourcePurpose.sourcePurposeId;
        });
        metaData.sourcePurpose = [...removedSourcePurpose];
        return {
            ...state,
            metaData: metaData
        };
    }),
    on(actionsDataCatalogAction.deleteDataSourcePurposeFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.deleteDataSubjectTypeSuccess, (state, { data }) => {
        let metaData = { ...state.metaData };
        let removedSubjectType = metaData.subjectType.filter((item) => {
            return item.subjectTypeId !== data.subjectType.subjectTypeId;
        });
        metaData.subjectType = [...removedSubjectType];
        return {
            ...state,
            metaData: metaData
        };
    }),
    on(actionsDataCatalogAction.deleteDataSubjectTypeFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(actionsDataCatalogAction.deleteDataLocationSuccess, (state, { data }) => {
        let metaData = { ...state.metaData };
        let removedLocation = metaData.location.filter((item) => {
            return !(item.country === data.location.country && item.state === data.location.state);
        });
        metaData.location = [...removedLocation];
        return {
            ...state,
            metaData: metaData
        };
    }),
    on(actionsDataCatalogAction.deleteDataLocationFailure, (state, { error }) => {
        return {
            ...state
        };
    })
);
