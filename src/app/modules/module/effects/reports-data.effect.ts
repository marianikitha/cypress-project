import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { ReportsService } from 'src/app/services/reports.service';
import * as reportsDataAction from '../actions/reports-data.action';
import * as globalSpinnerAction from '../actions/global-spinner.action';
import { AppState } from '../app.state';

@Injectable()
export class ReportsDataEffects {

    constructor(
        private router: Router,
        private action: Actions,
        private reportsService: ReportsService,
        private store: Store<AppState>
    ) { }

    sendAssessmentDataReportInEmail = createEffect(() =>
        this.action.pipe(
            ofType(reportsDataAction.sendAssessmentDataReportInEmail),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.reportsService.sendAssessmentDataReportInEmail(actionParams.data).pipe(
                    mergeMap((sendAssessmentDataResponse) => {
                        if (sendAssessmentDataResponse?.success) {
                            return of(
                                reportsDataAction.sendAssessmentDataReportInEmailSuccess({
                                    data: sendAssessmentDataResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                reportsDataAction.sendAssessmentDataReportInEmailFailure({
                                    error: sendAssessmentDataResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            reportsDataAction.sendAssessmentDataReportInEmailFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getReportDataCount = createEffect(() =>
        this.action.pipe(
            ofType(reportsDataAction.getReportDataCount),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.reportsService.getReportDataCount(actionParams.reportFilter).pipe(
                    mergeMap((getReportDataCountResponse) => {
                        if (getReportDataCountResponse?.success) {
                            return of(
                                reportsDataAction.getReportDataCountSuccess({
                                    totalRecords: getReportDataCountResponse?.data?.totalRecords
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                reportsDataAction.getReportDataCountFailure({
                                    error: getReportDataCountResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            reportsDataAction.getReportDataCountFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getReportDataFilters = createEffect(() =>
        this.action.pipe(
            ofType(reportsDataAction.getReportDataFilters),
            mergeMap((actionParams: any) => {
                console.log("in loader")
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.reportsService.getReportDataFilters(actionParams.data).pipe(
                    mergeMap((getReportDataFiltersResponse) => {
                        if (getReportDataFiltersResponse?.success) {
                            return of(
                                reportsDataAction.getReportDataFiltersSuccess({
                                    filterData: getReportDataFiltersResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                reportsDataAction.getReportDataFiltersFailure({
                                    error: getReportDataFiltersResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            reportsDataAction.getReportDataFiltersFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getReportDataColumns = createEffect(() =>
        this.action.pipe(
            ofType(reportsDataAction.getReportDataColumns),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.reportsService.getReportDataColumns(actionParams.data).pipe(
                    mergeMap((getReportDataColumnsResponse) => {
                        if (getReportDataColumnsResponse?.success) {
                            return of(
                                reportsDataAction.getReportDataColumnsSuccess({
                                    columns: {
                                        columnData: getReportDataColumnsResponse?.data,
                                        isColumnLoading: false
                                    }
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                reportsDataAction.getReportDataColumnsFailure({
                                    error: getReportDataColumnsResponse.error.message,
                                    columns: {
                                        isColumnLoading: true
                                    }
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            reportsDataAction.getReportDataColumnsFailure({
                                error, columns: {
                                    isColumnLoading: true
                                }
                            }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

}
