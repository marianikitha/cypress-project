import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { select, Store } from '@ngrx/store';
import { LoadMore, TreeData } from 'src/app/modules/models/tree-data';
import {
    clearTreeData,
    getTreeData,
    getTreeDataBySearchKeyword
} from '../modules/module/actions/actions-data-catalog.action';
import { AppState } from 'src/app/modules/module/app.state';
import { selectTreeData } from 'src/app/modules/module/selectors/actions-data-catalog.selector';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface DataSource {
    parent?: string;
    name: string;
    children?: DataSource[];
    pageSize?: number;
    pageNumber?: number;
}

/** Flat node with expandable and level information */
export class LoadmoreFlatNode {
    constructor(
        public item: string,
        public level = 1,
        public expandable = false,
        public loadMoreParentItem: string | null = null
    ) { }
}
const LOAD_MORE = 'LOAD_MORE';
const PREVIOUS_PAGE_LOAD_MORE = 'PREVIOUS_PAGE_LOAD_MORE';
const NEXT_PAGE_LOAD_MORE = 'NEXT_PAGE_LOAD_MORE';

/**
 * @title Tree with nested nodes
 */
@Component({
    selector: 'app-tree-view',
    templateUrl: './tree-view.component.html',
    styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
    treeControl = new NestedTreeControl<TreeData>((node) => node.children);
    dataSource = new MatTreeNestedDataSource<TreeData>();
    dataSourcePath: string = '';
    expandedNodes = new Array<any>();
    searchForm: any;
    treeDataFromStore: { type: string; data: TreeData[] } = {type: '', data: []};

    @Output() fetchDataInformation = new EventEmitter<any>();

    constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.searchFormBuilder();
        this.selectAllDataListFromStore();
        if(!this.treeDataFromStore.data.length)
            this.loadInitialTree();

        this.searchForm.controls['keyword'].valueChanges.subscribe((keyword: string) => {
            if (keyword === '' || keyword === null) {
                this.loadInitialTree();
                this.fetchDataInformation.emit(null)
            }
        });
    }

    loadInitialTree() {
        this.dataSourcePath = ''
        let postData = {
            data: {
                datasourcePath: [],
                pageSize: 10,
                pageNumber: 0
            }
        };
        this.store.dispatch(getTreeData(postData));
    }

    searchFormBuilder() {
        this.searchForm = this.formBuilder.group({
            keyword: [
                ,
                {
                    updateOn: 'change'
                }
            ]
        });
    }

    selectAllDataListFromStore() {
        // Select all tree data from state
        this.store
            .pipe<{ type: string; data: TreeData[] }>(select(selectTreeData))
            .subscribe((treeDataFromState: { type: string; data: TreeData[] }) => {
                this.treeDataFromStore = treeDataFromState
                // if(!treeDataFromState.data.length){
                //     this.fetchDataInformation.emit(null)
                // }
                this.dataSource.data = treeDataFromState.data;
                this.treeControl.dataNodes = treeDataFromState.data;
                // if (treeDataFromState.type === 'search') {
                this.treeControl.expandAll();
                // }
            });
    }

    hasChild = (_: number, node: DataSource) => {
        // console.log("hasChild", _, node);
        return !!node.children && node.children.length > 0;
    };

    isLoadMore = (_: number, _nodeData: DataSource) => _nodeData.name === LOAD_MORE;
    isPreviousPageLoadMore = (_: number, _nodeData: DataSource) => _nodeData.name === PREVIOUS_PAGE_LOAD_MORE;
    isNextPageLoadMore = (_: number, _nodeData: DataSource) => _nodeData.name === NEXT_PAGE_LOAD_MORE;

    loadMore = async (node: LoadMore) => {
        let postData = {
            data: {
                datasourcePath: node.datasourcePath,
                pageSize: node.pageSize,
                pageNumber: node.pageNumber
            }
        };
        this.store.dispatch(getTreeData(postData));
    };

    searchByKeyword = async (node: any) => {
        let keyword: string, data: any;
        keyword = this.searchForm.get('keyword').value?.trim();
        if (!keyword) {
            this.openSnackBar('Search data cannot be empty', 'Close');
            // this.loadInitialTree();
            return;
        } else {
            if (node === null) {
                data = {
                    pageSize: 20,
                    pageNumber: 0,
                    keyword: keyword
                };
            } else {
                data = {
                    pageSize: node.pageSize,
                    pageNumber: node.pageNumber,
                    keyword: keyword
                };
            }
            let postData = {
                data: data
            };
            this.fetchDataInformation.emit(null)
            this.dataSourcePath = ''
            this.store.dispatch(getTreeDataBySearchKeyword(postData));
        }
    };

    resetSearchForm() {
        this.searchForm.reset('');
    }

    expandNodeBasedOnHistory(data: any[]): any {
        data.forEach((node: any) => {
            if (this.treeControl.isExpanded(node)) {
                this.treeControl.expand(node);
                this.expandNodeBasedOnHistory(node.children);
            }
        });
    }

    restoreExpandedNodes() {
        const data = this.treeControl.dataNodes;
        this.expandNodeBasedOnHistory(data);
    }

    loadChildren(node: any) {
        this.dataSourcePath = JSON.stringify(node.datasourcePath)
        // if (node.children[0].name === 'LOAD_MORE') {
        //     this.loadMore(node.children[0]);
        // }
        this.fetchDataInformation.emit(node);
    }

    stringifyData(data: any) {
        return JSON.stringify(data)
    }

    selectedLastNode(node: any) {
        this.dataSourcePath = JSON.stringify(node.datasourcePath)
        this.fetchDataInformation.emit(node);
        // console.log('dataSourcePath',this.dataSourcePath)
    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 4 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-style']
        });
    }
    ngOnDestroy() {
        let keyword = this.searchForm.get('keyword').value?.trim();
        if (keyword) {
            this.store.dispatch(clearTreeData());
        }
    }
}
