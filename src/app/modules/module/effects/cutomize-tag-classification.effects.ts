import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import * as customizeTagsClassificationAction from '../actions/cutomize-tag-classification.action';
import { TagClassificatoinService } from 'src/app/services/tags-classification.service';
import * as globalSpinnerAction from '../actions/global-spinner.action';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomizeTagsClassificationEffects {
    constructor(
        private action: Actions,
        private tagsClassificationService: TagClassificatoinService,
        private store: Store<AppState>
    ) {}

    getAllTags = createEffect(() =>
        this.action.pipe(
            ofType(customizeTagsClassificationAction.getAllTags),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap(() =>
                this.tagsClassificationService.getTagsList().pipe(
                    mergeMap((getAllTagsResponse) => {
                        if (getAllTagsResponse?.success) {
                            return of(
                                customizeTagsClassificationAction.getAllTagsSuccess({
                                    data: getAllTagsResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                customizeTagsClassificationAction.getAllTagsFailure({
                                    error: getAllTagsResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            customizeTagsClassificationAction.getAllTagsFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    getAllClassification = createEffect(() =>
        this.action.pipe(
            ofType(customizeTagsClassificationAction.getAllClassification),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap(() =>
                this.tagsClassificationService.getClassificationList().pipe(
                    mergeMap((getAllClassificationResponse) => {
                        if (getAllClassificationResponse?.success) {
                            return of(
                                customizeTagsClassificationAction.getAllClassificationSuccess({
                                    data: getAllClassificationResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                customizeTagsClassificationAction.getAllClassificationFailure({
                                    error: getAllClassificationResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            customizeTagsClassificationAction.getAllClassificationFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    deleteClassification = createEffect(() =>
        this.action.pipe(
            ofType(customizeTagsClassificationAction.deleteClassification),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.tagsClassificationService.deleteClassification(actionParams.data).pipe(
                    mergeMap((deleteClassificationResponse) => {
                        if (deleteClassificationResponse?.success) {
                            return of(
                                customizeTagsClassificationAction.deleteClassificationSuccess({
                                    data: deleteClassificationResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                customizeTagsClassificationAction.deleteClassificationFailure({
                                    error: deleteClassificationResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            customizeTagsClassificationAction.deleteClassificationFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    addTags = createEffect(() =>
        this.action.pipe(
            ofType(customizeTagsClassificationAction.addTags),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.tagsClassificationService.addTags(actionParams.tag).pipe(
                    mergeMap((addTagsResponse) => {
                        if (addTagsResponse?.success) {
                            return of(
                                customizeTagsClassificationAction.addTagsSuccess({ data: addTagsResponse?.data }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                customizeTagsClassificationAction.addTagsFailure({
                                    error: addTagsResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            customizeTagsClassificationAction.addTagsFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );

    addClassification = createEffect(() =>
        this.action.pipe(
            ofType(customizeTagsClassificationAction.addClassification),
            mergeMap((actionParams: any) => {
                this.store.dispatch(globalSpinnerAction.showSpinner());
                return of(actionParams);
            }),
            mergeMap((actionParams: any) =>
                this.tagsClassificationService.addClassification(actionParams.data).pipe(
                    mergeMap((addClassificationResponse) => {
                        if (addClassificationResponse?.success) {
                            return of(
                                customizeTagsClassificationAction.addClassificationSuccess({
                                    data: addClassificationResponse?.data
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        } else {
                            return of(
                                customizeTagsClassificationAction.addClassificationFailure({
                                    error: addClassificationResponse.error.message
                                }),
                                globalSpinnerAction.hideSpinner()
                            );
                        }
                    }),
                    catchError((error) => {
                        return of(
                            customizeTagsClassificationAction.addClassificationFailure({ error }),
                            globalSpinnerAction.hideSpinner()
                        );
                    })
                )
            )
        )
    );
}
