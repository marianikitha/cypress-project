import { createAction, props } from '@ngrx/store';
import { TagClassification, Category } from 'src/app/modules/models/tag-classification';
import { Tag } from 'src/app/modules/models/tag';
//Tags
export const getAllTags = createAction('[Customize Tags] Get All Tags');
export const getAllTagsSuccess = createAction(
    '[Customize Tags] Get All Tags Success',
    props<{ data: { tags: Tag[] | [] } }>()
);

export const getAllTagsFailure = createAction('[Customize Tags] Get All Tags Failure', props<{ error: any }>());

export const addTags = createAction('[Customize Tags] Add Tags', props<{ tag: { tagName: string } }>());
export const addTagsSuccess = createAction('[Customize Tags] Add Tags Success', props<{ data: { tag: Tag } }>());
export const addTagsFailure = createAction('[Customize Tags] Add Tags failure', props<{ error: any }>());

//Classification

export const getAllClassification = createAction('[Customize Tags] Get All Classification');
export const getAllClassificationSuccess = createAction(
    '[Customize Tags] Get All Classification Success',
    props<{ data: { category: TagClassification[] | [] } }>()
);

export const getAllClassificationFailure = createAction(
    '[Customize Tags] Get All Classification Failure',
    props<{ error: any }>()
);

export const addClassification = createAction(
    '[Customize Tags] Add Classification',
    props<{ data: { category: Category } }>()
);
export const addClassificationSuccess = createAction(
    '[Customize Tags] Add Classification Success',
    props<{ data: { category: Category } }>()
);
export const addClassificationFailure = createAction(
    '[Customize Tags] Add Classification failure',
    props<{ error: any }>()
);

export const deleteClassification = createAction(
    '[Customize Tags] Delete Classification',
    props<{ data: { category: Category } }>()
);

export const deleteClassificationSuccess = createAction(
    '[Customize Tags] Delete Classification Success',
    props<{ data: { category: Category } }>()
);

export const deleteClassificationFailure = createAction(
    '[Customize Tags] Delete Classification failure',
    props<{ error: any }>()
);
