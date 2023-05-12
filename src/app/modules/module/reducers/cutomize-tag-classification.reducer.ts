import { createReducer, on, Action } from '@ngrx/store';
import * as customizeTagsClassificationAction from '../actions/cutomize-tag-classification.action';
import { CustomizeTagsClassificationState } from '../states/customize-tags.state';
const initialState: CustomizeTagsClassificationState = {
    tagList: [],
    categoryList: []
};

export const CustomizeTagsClassificationReducer = createReducer(
    initialState,
    on(customizeTagsClassificationAction.getAllTagsSuccess, (state, { data }) => {
        return {
            ...state,
            tagList: data.tags
        };
    }),
    on(customizeTagsClassificationAction.getAllClassificationSuccess, (state, { data }) => {
        return {
            ...state,
            categoryList: data.category
        };
    }),
    on(customizeTagsClassificationAction.getAllTagsFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(customizeTagsClassificationAction.getAllClassificationFailure, (state, { error }) => {
        return {
            ...state
        };
    }),

    on(customizeTagsClassificationAction.deleteClassificationSuccess, (state, { data }) => {
        let newCategoryList = JSON.parse(JSON.stringify(state.categoryList));
        let index: number = newCategoryList.findIndex(
            (item: any) => item?.name?.toLowerCase() == data?.category?.name?.toLowerCase()
        );
        let newList = newCategoryList[index].combination.filter(
            (existingCategory: any) => !(existingCategory?.id == data?.category?.combination?.id)
        );
        newCategoryList[index].combination = newList;

        // Remove deleted purpose from existing state
        return {
            ...state,
            categoryList: newCategoryList
        };
    }),
    on(customizeTagsClassificationAction.deleteClassificationFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(customizeTagsClassificationAction.addClassificationSuccess, (state, { data }) => {
        let newCategoryList = JSON.parse(JSON.stringify(state.categoryList));
        let index: number = newCategoryList.findIndex(
            (item: any) => item?.name?.toLowerCase() == data?.category?.name?.toLowerCase()
        );
        newCategoryList[index]?.combination?.push(data?.category?.combination);
        return {
            ...state,
            categoryList: newCategoryList
        };
    }),
    on(customizeTagsClassificationAction.addClassificationFailure, (state, { error }) => {
        return {
            ...state
        };
    }),
    on(customizeTagsClassificationAction.addTagsSuccess, (state, { data }) => {
        let newTagList = [
            ...state.tagList.filter(
                (existingTag) => !(existingTag?.name?.toLowerCase() === data?.tag?.name?.toLowerCase())
            )
        ];
        newTagList.push(data.tag);
        return {
            ...state,
            tagList: newTagList
        };
    }),
    on(customizeTagsClassificationAction.addTagsFailure, (state, { error }) => {
        return {
            ...state
        };
    })
);
