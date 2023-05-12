import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, switchMap } from 'rxjs/operators';

import * as actionsDataCatalogAction from '../actions/actions-data-catalog.action';
import { DataCatalogService } from 'src/app/services/data-catalog.service';
import * as globalSpinnerAction from '../actions/global-spinner.action';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
@Injectable()
export class ActionsDataCatalogEffects {
    constructor(
        private router: Router,
        private action: Actions,
        private datacatalogService: DataCatalogService,
        private store: Store<AppState>
    ) { }

    // getAllCountries = createEffect(() =>
    //     this.action.pipe(
    //         ofType(actionsDataCatalogAction.getAllCountries),
    //         mergeMap((actionParams: any) => {
    //             this.store.dispatch(globalSpinnerAction.showSpinner());
    //             return of(actionParams);
    //         }),
    //         mergeMap(() =>
    //             this.datacatalogService.getCountriesList().pipe(
    //                 mergeMap((getAllCountriesResponse) => {
    //                     if (getAllCountriesResponse?.success) {
    //                         return of(
    //                             actionsDataCatalogAction.getAllCountriesSuccess({
    //                                 country: getAllCountriesResponse?.data
    //                             }),
    //                             globalSpinnerAction.hideSpinner()
    //                         );
    //                     } else {
    //                         return of(
    //                             actionsDataCatalogAction.getAllCountriesFailure({
    //                                 error: getAllCountriesResponse.error.message
    //                             }),
    //                             globalSpinnerAction.hideSpinner()
    //                         );
    //                     }
    //                 }),
    //                 catchError((error) => {
    //                     return of(
    //                         actionsDataCatalogAction.getAllCountriesFailure({ error }),
    //                         globalSpinnerAction.hideSpinner()
    //                     );
    //                 })
    //             )
    //         )
    //     )
    // );

    // getAllEuCountries = createEffect(() =>
    //     this.action.pipe(
    //         ofType(actionsDataCatalogAction.getAllEuCountries),
    //         mergeMap((actionParams: any) => {
    //             this.store.dispatch(globalSpinnerAction.showSpinner());
    //             return of(actionParams);
    //         }),
    //         mergeMap(() =>
    //             this.datacatalogService.getEuCountriesList().pipe(
    //                 mergeMap((getAllEuCountriesResponse) => {
    //                     if (getAllEuCountriesResponse?.success) {
    //                         return of(
    //                             actionsDataCatalogAction.getAllEuCountriesSuccess({
    //                                 eucountry: getAllEuCountriesResponse?.data
    //                             }),
    //                             globalSpinnerAction.hideSpinner()
    //                         );
    //                     } else {
    //                         return of(
    //                             actionsDataCatalogAction.getAllEuCountriesFailure({
    //                                 error: getAllEuCountriesResponse.error.message
    //                             }),
    //                             globalSpinnerAction.hideSpinner()
    //                         );
    //                     }
    //                 }),
    //                 catchError((error) => {
    //                     return of(
    //                         actionsDataCatalogAction.getAllEuCountriesFailure({ error }),
    //                         globalSpinnerAction.hideSpinner()
    //                     );
    //                 })
    //             )
    //         )
    //     )
    // );

    // getAllStates = createEffect(() =>
    //     this.action.pipe(
    //         ofType(actionsDataCatalogAction.getAllStates),
    //         mergeMap((actionParams: any) => {
    //             this.store.dispatch(globalSpinnerAction.showSpinner());
    //             return of(actionParams);
    //         }),
    //         mergeMap(() =>
    //             this.datacatalogService.getStatesList().pipe(
    //                 mergeMap((getAllStatesResponse) => {
    //                     if (getAllStatesResponse?.success) {
    //                         return of(
    //                             actionsDataCatalogAction.getAllStatesSuccess({
    //                                 states: getAllStatesResponse?.data
    //                             }),
    //                             globalSpinnerAction.hideSpinner()
    //                         );
    //                     } else {
    //                         return of(
    //                             actionsDataCatalogAction.getAllStatesFailure({
    //                                 error: getAllStatesResponse.error.message
    //                             }),
    //                             globalSpinnerAction.hideSpinner()
    //                         );
    //                     }
    //                 }),
    //                 catchError((error) => {
    //                     return of(
    //                         actionsDataCatalogAction.getAllStatesFailure({ error }),
    //                         globalSpinnerAction.hideSpinner()
    //                     );
    //                 })
    //             )
    //         )
    //     )
    // );

    getTreeData = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.getTreeData),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.getTreeData(actionParams).pipe(
                    mergeMap((getTreeDataResponse) => {
                        if (getTreeDataResponse?.success) {
                            return of(
                                actionsDataCatalogAction.getTreeDataSuccess({
                                    tree: getTreeDataResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.getTreeDataFailure({
                                    error: getTreeDataResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.getTreeDataFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getTreeDataBySearchKeyword = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.getTreeDataBySearchKeyword),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.getTreeDataBySearchKeyword(actionParams.data).pipe(
                    mergeMap((getTreeDataBySearchKeywordResponse) => {
                        if (getTreeDataBySearchKeywordResponse?.success) {
                            return of(
                                actionsDataCatalogAction.getTreeDataBySearchKeywordSuccess({
                                    tree: getTreeDataBySearchKeywordResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.getTreeDataBySearchKeywordFailure({
                                    error: getTreeDataBySearchKeywordResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.getTreeDataFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getAllSourcePurpose = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.getAllSourcePurpose),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap(() =>
                this.datacatalogService.getSourcePurposeList().pipe(
                    mergeMap((getAllSourcePurposeResponse) => {
                        if (getAllSourcePurposeResponse?.success) {
                            return of(
                                actionsDataCatalogAction.getAllSourcePurposeSuccess({
                                    sourcePurposeList: getAllSourcePurposeResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.getAllSourcePurposeFailure({
                                    error: getAllSourcePurposeResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.getAllSourcePurposeFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getAllSubjectType = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.getAllSubjectType),
            mergeMap((actionParams: any) => {
                console.log("in bjbjbhhr")
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap(() =>
                this.datacatalogService.getSubjectTypeList().pipe(
                    mergeMap((getAllSubjectTypeResponse) => {
                        if (getAllSubjectTypeResponse?.success) {
                            return of(
                                actionsDataCatalogAction.getAllSubjectTypeSuccess({
                                    subjectTypeList: getAllSubjectTypeResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.getAllSubjectTypeFailure({
                                    error: getAllSubjectTypeResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.getAllSubjectTypeFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getDataDetails = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.getDataDetails),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.getDataDetails(actionParams).pipe(
                    mergeMap((getDataDetailsResponse) => {
                        if (getDataDetailsResponse?.success) {
                            return of(
                                actionsDataCatalogAction.getDataDetailsSuccess({
                                    dataDetails: getDataDetailsResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.getDataDetailsFailure({
                                    error: getDataDetailsResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.getDataDetailsFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getMetadata = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.getMetadata),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.getMetadata(actionParams).pipe(
                    mergeMap((getMetadataResponse) => {
                        if (getMetadataResponse?.success) {
                            return of(
                                actionsDataCatalogAction.getMetadataSuccess({
                                    metaData: getMetadataResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.getMetadataFailure({
                                    error: getMetadataResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.getMetadataFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getUsersWithAccess = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.getUsersWithAccess),
            mergeMap((actionParams: any) => {
                console.log("in bjbjbhhr")
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.getUsersWithAccess(actionParams).pipe(
                    mergeMap((getUsersWithAccessResponse) => {
                        console.log(actionParams)
                        if (getUsersWithAccessResponse?.success) {
                            return of(
                                actionsDataCatalogAction.getUsersWithAccessSuccess({
                                    usersWithAccess: getUsersWithAccessResponse?.data?.users
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.getUsersWithAccessFailure({
                                    error: getUsersWithAccessResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.getUsersWithAccessFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    // getAdUsers = createEffect(() =>
    //     this.action.pipe(
    //         ofType(actionsDataCatalogAction.getAdUsers),
    //         mergeMap((actionParams: any) => {
    //             this.store.dispatch(globalSpinnerAction.showSpinner());
    //             return of(actionParams);
    //         }),
    //         mergeMap((actionParams: any) =>
    //             this.datacatalogService.getAdUsers(actionParams.data).pipe(
    //                 mergeMap((getAdUsersResponse) => {
    //                     if (getAdUsersResponse?.success) {
    //                         return of(
    //                             actionsDataCatalogAction.getAdUsersSuccess({
    //                                 adUsers: getAdUsersResponse?.data
    //                             }),
    //                             globalSpinnerAction.hideSpinner()
    //                         );
    //                     } else {
    //                         return of(
    //                             actionsDataCatalogAction.getAdUsersFailure({
    //                                 error: getAdUsersResponse.error.message
    //                             }),
    //                             globalSpinnerAction.hideSpinner()
    //                         );
    //                     }
    //                 }),
    //                 catchError((error) => {
    //                     return of(
    //                         actionsDataCatalogAction.getAdUsersFailure({ error }),
    //                         globalSpinnerAction.hideSpinner()
    //                     );
    //                 })
    //             )
    //         )
    //     )
    // );

    addDataOwner = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.addDataOwner),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.addDataOwner(actionParams).pipe(
                    mergeMap((addDataOwnerResponse) => {
                        if (addDataOwnerResponse?.success) {
                            return of(
                                actionsDataCatalogAction.addDataOwnerSuccess({
                                    data: addDataOwnerResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.addDataOwnerFailure({
                                    error: addDataOwnerResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.addDataOwnerFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    addDataSourcePurpose = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.addDataSourcePurpose),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.addDataSourcePurpose(actionParams).pipe(
                    mergeMap((addDataSourcePurposeResponse) => {
                        if (addDataSourcePurposeResponse?.success) {
                            return of(
                                actionsDataCatalogAction.addDataSourcePurposeSuccess({
                                    data: addDataSourcePurposeResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.addDataSourcePurposeFailure({
                                    error: addDataSourcePurposeResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.addDataSourcePurposeFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    addDataSubjectType = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.addDataSubjectType),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.addDataSubjectType(actionParams).pipe(
                    mergeMap((addDataSubjectTypeResponse) => {
                        if (addDataSubjectTypeResponse?.success) {
                            return of(
                                actionsDataCatalogAction.addDataSubjectTypeSuccess({
                                    data: addDataSubjectTypeResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.addDataSubjectTypeFailure({
                                    error: addDataSubjectTypeResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.addDataSubjectTypeFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    addDataLocation = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.addDataLocation),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.addDataLocation(actionParams).pipe(
                    mergeMap((addDataLocationResponse) => {
                        if (addDataLocationResponse?.success) {
                            return of(
                                actionsDataCatalogAction.addDataLocationSuccess({
                                    data: addDataLocationResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.addDataLocationFailure({
                                    error: addDataLocationResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.addDataLocationFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    addDataRetention = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.addDataRetention),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.addDataRetention(actionParams).pipe(
                    mergeMap((addDataRetentionResponse) => {
                        if (addDataRetentionResponse?.success) {
                            return of(
                                actionsDataCatalogAction.addDataRetentionSuccess({
                                    data: addDataRetentionResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.addDataRetentionFailure({
                                    error: addDataRetentionResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.addDataRetentionFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    addDataHasMinorInformation = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.addDataHasMinorInformation),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.addDataHasMinorInformation(actionParams).pipe(
                    mergeMap((addDataHasMinorInformationResponse) => {
                        if (addDataHasMinorInformationResponse?.success) {
                            return of(
                                actionsDataCatalogAction.addDataHasMinorInformationSuccess({
                                    data: addDataHasMinorInformationResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.addDataHasMinorInformationFailure({
                                    error: addDataHasMinorInformationResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.addDataHasMinorInformationFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    deleteDataSourcePurpose = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.deleteDataSourcePurpose),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.deleteDataSourcePurpose(actionParams).pipe(
                    mergeMap((deleteDataSourcePurposeResponse) => {
                        if (deleteDataSourcePurposeResponse?.success) {
                            return of(
                                actionsDataCatalogAction.deleteDataSourcePurposeSuccess({
                                    data: deleteDataSourcePurposeResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.deleteDataSourcePurposeFailure({
                                    error: deleteDataSourcePurposeResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.deleteDataSourcePurposeFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    deleteDataSubjectType = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.deleteDataSubjectType),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.deleteDataSubjectType(actionParams).pipe(
                    mergeMap((deleteDataSubjectTypeResponse) => {
                        if (deleteDataSubjectTypeResponse?.success) {
                            return of(
                                actionsDataCatalogAction.deleteDataSubjectTypeSuccess({
                                    data: deleteDataSubjectTypeResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.deleteDataSubjectTypeFailure({
                                    error: deleteDataSubjectTypeResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.deleteDataSubjectTypeFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    deleteDataLocation = createEffect(() =>
        this.action.pipe(
            ofType(actionsDataCatalogAction.deleteDataLocation),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.datacatalogService.deleteDataLocation(actionParams).pipe(
                    mergeMap((deleteDataLocationResponse) => {
                        if (deleteDataLocationResponse?.success) {
                            return of(
                                actionsDataCatalogAction.deleteDataLocationSuccess({
                                    data: deleteDataLocationResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                actionsDataCatalogAction.deleteDataLocationFailure({
                                    error: deleteDataLocationResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            actionsDataCatalogAction.deleteDataLocationFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );
}
