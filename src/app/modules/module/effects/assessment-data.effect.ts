// import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { AssessmentService } from 'src/app/services/assessment.service';

import * as assessmentDataAction from '../actions/assessment-data.action';
import * as globalSpinnerAction from '../actions/global-spinner.action';
import { AppState } from '../app.state';
import { Injectable } from '@angular/core';

@Injectable()
export class AssessmentDataEffects {
    constructor(
        private router: Router,
        private action: Actions,
        private assessmentService: AssessmentService,
        private store: Store<AppState>
    ) { }

    getAllAssessmentData = createEffect(() =>
        this.action.pipe(
            ofType(assessmentDataAction.getAllAssessmentData),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.assessmentService.getAssessmentData(actionParams.assessmentFilter).pipe(
                    mergeMap((getAllAssessmentDataResponse) => {
                        if (getAllAssessmentDataResponse?.success) {
                            return of(
                                assessmentDataAction.getAllAssessmentDataSuccess({
                                    assessmentData: getAllAssessmentDataResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                assessmentDataAction.getAllAssessmentDataFailure({
                                    error: getAllAssessmentDataResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            assessmentDataAction.getAllAssessmentDataFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getAllAssessmentDatause = createEffect(() =>
        this.action.pipe(
            ofType(assessmentDataAction.getAllAssessmentDatause),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.assessmentService.getAssessmentDatause(actionParams.assessmentFilter).pipe(
                    mergeMap((getAllAssessmentDatauseResponse) => {
                        if (getAllAssessmentDatauseResponse?.success) {
                            return of(
                                assessmentDataAction.getAllAssessmentDatauseSuccess({
                                    assessmentData: getAllAssessmentDatauseResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                assessmentDataAction.getAllAssessmentDatauseFailure({
                                    error: getAllAssessmentDatauseResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            assessmentDataAction.getAllAssessmentDatauseFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getAllAssessmentDataByUsage = createEffect(() =>
        this.action.pipe(
            ofType(assessmentDataAction.getAllAssessmentDataByUsage),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.assessmentService.getAssessmentDataByUsage(actionParams.assessmentFilter).pipe(
                    mergeMap((getAllAssessmentDataByUsageResponse) => {
                        if (getAllAssessmentDataByUsageResponse?.success) {
                            return of(
                                assessmentDataAction.getAllAssessmentDataByUsageSuccess({
                                    assessmentData: getAllAssessmentDataByUsageResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                assessmentDataAction.getAllAssessmentDataByUsageFailure({
                                    error: getAllAssessmentDataByUsageResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            assessmentDataAction.getAllAssessmentDataByUsageFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );
}
