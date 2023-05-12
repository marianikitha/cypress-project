import { Component, OnInit, ViewChild } from '@angular/core';
import { selectAssessmentData } from '../modules/module/selectors/assessment-data.selector';
import { AssessmentData } from '../modules/models/assessment-data';
import { AssessmentDatause } from '../modules/models/assessment-datause';
import { Store } from '@ngrx/store';
import { AppState } from '../modules/module/app.state';
import { getAllAssessmentData, getAllAssessmentDatause, resetAssessmentData } from '../modules/module/actions/assessment-data.action';
import { MatTableDataSource } from '@angular/material/table';
import { BreachAssessmentFilters, ColumnFilter, LabelProps } from '../modules/models/data-filter';
import { AssessmentFilter } from '../modules/models/assessment-filter';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../services copy/data/data.service';
import { NavigationService } from '../services copy/auth/navigation/navigation.service';
import { selectColumnData, selectFilterData, selectTotalRecords } from '../modules/module/selectors/reports-data.selector';
import { getReportDataColumns, getReportDataCount, getReportDataFilters, resetReportsData } from '../modules/module/actions/reports-data.action';
import { Sort } from '@angular/material/sort';
import { DataassetcolumnComponent } from '../dataassetcolumn/dataassetcolumn.component';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit {
  searchInputText: string = '';
  searchForm: any;
  isLoading: boolean = true;
  isColumnLoading: boolean = true;
  dataSource = new MatTableDataSource<any>([]);
  totalPage: number = 1;
  totalPageLength: number = 0;
  timeoutId!: ReturnType<typeof setTimeout>;
  resetFilteredItem: boolean = true;
  tableColumnProperties: any;
  filters: ColumnFilter[] = []
  userActionFromOtherScreen: {
      filter: ColumnFilter[];
      userAction: boolean;
  } = {
          filter: [
              {
                  columnName: '',
                  value: ''
              }
          ],
          userAction: false
      };
  totalRecords: number = 0;
  disableColumDetails: boolean = false;
  tableState: AssessmentFilter = {
      filter: {
          tags: [],
          breachRisk: [],
          accessPrivilege: []
      },
      pageSize: 15,
      pageNumber: 1,
      searchTerm: '',
      sortBy: 'dsc',
      sortColumn: 'breachRisk',
      pageName: 'breach-risk'
  };
  tableColumnFilters: {
      breachRiskList: LabelProps[];
      accessPrivilegeList: LabelProps[];
      tagList: LabelProps[];
  } = {
          breachRiskList: [],
          accessPrivilegeList: [],
          tagList: []
      };
  isClicked: string = '';
  isCopied: string = '';
  dataSubscription: any;
  filterSubscription: any;
  recordsSubscription: any;
  columnDetailsSubscription: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isVisible: boolean = false;
  customizedValues: any;
  constructor( private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private dataService: DataService,
    private navigation: NavigationService,
    private router: Router, // @Inject(MAT_DIALOG_DATA) // public dialogData: {
    // private _snackBar: MatSnackBar,
    ) { }

    displayedColumns: string[] = [
      'dataasset',
      'personalData',
      'tags',
      'totalRows',
      'breachRisk',
      'financialImpactInDollars',
      'usersWithAccess',
      'accessPrivilege',
      'breachRecommendedAction',
      'columnDetails'
  ];

  defaultFilters: any;


  ngOnInit(): void {
    // console.log('hello comp1')
    // this.store.dispatch(getReportDataFilters({ data: { filter: 'all' } }))

//     this.store.dispatch(getAllAssessmentData({ assessmentFilter: AssessmentFilter  }));
//     this.store.select(selectAssessmentData).subscribe((assessment: { values: AssessmentData[] | [] | AssessmentDatause[], isLoading: boolean, disableColumDetails: boolean }) => {
//       assessment = JSON.parse(JSON.stringify(assessment));
//       console.log(assessment)
     
//   });

  this.createSearchForm();
  this.breachriskfilter();
  this.excessiveAccessfilter();
  let popState = this.navigation.onPopState();
  this.retainFilter(popState);
  this.recordsSubscription = this.store.select(selectTotalRecords).subscribe((totalRecords: number) => {
      this.totalRecords = totalRecords
  })
  this.filterSubscription = this.store.select(selectFilterData).subscribe((filterData: BreachAssessmentFilters) => {
      this.defaultFilters = filterData
      filterData = JSON.parse(JSON.stringify(filterData))
      this.resetAllFilters(filterData)
      this.userActionFromOtherScreen.userAction &&
          this.userActionFromOtherScreen.filter.map((data: any) => {
              this.applyCheckboxSelection(data, this.userActionFromOtherScreen.userAction);
          });
  })
  this.dataSubscription = this.store.select(selectAssessmentData).subscribe((assessment: { values: AssessmentData[] | [] | AssessmentDatause[], isLoading: boolean, disableColumDetails: boolean }) => {
      assessment = JSON.parse(JSON.stringify(assessment));
      this.dataSource.data = assessment.values;
      this.isLoading = assessment.isLoading;
      this.disableColumDetails = assessment.disableColumDetails;
      this.calculateTotalPage();
  });

  this.store.dispatch(getReportDataColumns({ data: { pageName: 'breach-risk' } }))
  this.columnDetailsSubscription = this.store.select(selectColumnData).subscribe((columnDetails: {
      isColumnLoading: boolean,
      columnData: [
          {
              key: string;
              type: string;
              value: string;
              children?: [{ key: string; type: string; value: string }];
          }
      ] | [];
  }) => {
      this.isColumnLoading = columnDetails.isColumnLoading;
      if (columnDetails.isColumnLoading === true) {
          // this.openSnackBar(`Data could not be loaded`, 'Close');
          return;
      }

      let customVal = columnDetails.columnData,
          customtObj = {};
      customVal.forEach((item: any) => {
          customtObj = {
              ...customtObj,
              [item.key]: item.value
          };
      });
      this.customizedValues = customtObj;
  })


  }

//   openSnackBar(message: string, action: string) {
//     this._snackBar.open(message, action, {
//         duration: 4 * 1000,
//         horizontalPosition: 'center',
//         verticalPosition: 'top',
//         panelClass: ['snackbar-style']
//     });
// }

ngOnDestroy() {
    this.recordsSubscription && this.recordsSubscription.unsubscribe();
    this.filterSubscription && this.filterSubscription.unsubscribe();
    this.dataSubscription && this.dataSubscription.unsubscribe();
    this.columnDetailsSubscription && this.columnDetailsSubscription.unsubscribe();
    this.store.dispatch(resetAssessmentData())
    this.store.dispatch(resetReportsData())
}

resetAllFilters(filterData: any) {
    this.tableColumnProperties = {
        personalDataList: filterData.personalData || []
    };
    this.resetFilteredItem &&
        (this.tableColumnFilters = {
            breachRiskList: JSON.parse(JSON.stringify(filterData.breachRiskFilters)) || [],
            accessPrivilegeList: JSON.parse(JSON.stringify(filterData.accessPrivilegeFilters)) || [],
            tagList: JSON.parse(JSON.stringify(filterData.tagFilters)) || []
        });
}

retainFilter(popState: boolean) {
    if (history?.state?.breadcrumb || popState) {
        let storedData = this.dataService.getStoredState(this.tableState.pageName);
        if (storedData) {
            this.tableState = storedData;
            this.searchInputText = this.tableState?.searchTerm;
            let appliedFilters: any = { tag: this.tableState?.filter?.tags, breachRisk: this.tableState?.filter?.breachRisk, accessPrivilege: this.tableState?.filter?.accessPrivilege }
            this.tableState.filter = {
                tags: [],
                accessPrivilege: [],
                breachRisk: []
            }
            appliedFilters.tag.length > 0 &&
                appliedFilters.tag.map((data: string) => {
                    this.addFilter('tags', { key: data }, true);
                });
            appliedFilters.breachRisk.length > 0 &&
                appliedFilters.breachRisk.map((data: string) => {
                    this.addFilter('breach-risk', { key: data }, true);
                });
            appliedFilters.accessPrivilege.length > 0 &&
                appliedFilters.accessPrivilege.map((data: string) => {
                    this.addFilter('access-privilege', { key: data }, true);
                });
        }
        this.applyFilter(true);
    } else {
        this.applyFilter(true);
    }
}

breachriskfilter() {
    if (history.state && history?.state?.value && history?.state?.chart == 'breach-risk') {
        this.addFilter('breach-risk', { key: history?.state?.value }, true);
    }
}

excessiveAccessfilter() {
    if (history.state && history?.state?.value && history?.state?.chart == 'excessive-access') {
        this.addFilter('access-privilege', { key: history?.state?.value }, true);
    }
}

createSearchForm() {
    this.searchForm = this.formBuilder.group({
        searchInput: ['']
    });
}

calculateTotalPage() {
    this.totalPage =
        this.totalRecords !== 0 && this.totalRecords % this.tableState.pageSize == 0
            ? this.totalRecords / this.tableState.pageSize
            : Math.floor(this.totalRecords / this.tableState.pageSize) + 1;
    this.totalPageLength = this.totalPage.toString().length;
}

resetSearchForm() {
    this.searchForm.reset();
    this.tableState.searchTerm = '';
    this.tableState.pageNumber = 1;
    this.applyFilter(true);
}

resetPaginator() {
    if (this.paginator) {
        this.paginator.length = this.totalRecords;
        this.paginator.pageIndex = 0;
        this.tableState.pageNumber = 1;
        this.tableState.pageSize = this.paginator.pageSize;
    }
}

freeSearchSubmit() {
    console.log("clicked search button")
    let searchValue = this.searchForm.controls['searchInput'].value;
    this.tableState.searchTerm = searchValue;
    this.tableState.pageNumber = 1;
    this.applyFilter(true);
    this.resetSearchForm()
}

getColumnDetails(dataasset: string[], dataassetId: string | null) {
    this.dialog.open(DataassetcolumnComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        data: {
            datasourcePath: dataasset || [],
            dataassetId: dataassetId || null
        }
    });
}

goToPage(event: any) {
    if (event.target.value != '') {
        if (event.target.value > this.totalPage || event.target.value <= 0) {
            this.paginator.pageIndex = 0;
            event.target.value = 1;
        } else {
            this.paginator.pageIndex = event.target.value - 1;
        }
        this.paginator.page.next({
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            length: this.paginator.length
        });
    }
}

pageChange(page: PageEvent) {
    this.tableState.pageSize = page?.pageSize;
    this.tableState.pageNumber = page?.pageIndex + 1;
    this.applyFilter(false);
}

sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
        this.tableState.sortBy = 'asc';
        this.tableState.sortColumn = 'breachRisk';
    } else {
        this.tableState.sortBy = sort.direction === 'desc' ? 'dsc' : sort.direction;
        this.tableState.sortColumn = sort.active;
    }
    this.applyFilter(true, false);
}

applyFilter(resetPage: boolean, count: boolean = true) {
    count && this.store.dispatch(getReportDataCount({ reportFilter: Object.assign({}, this.tableState) }))
    this.store.dispatch(getAllAssessmentData({ assessmentFilter: Object.assign({}, this.tableState) }));
    if (resetPage) {
        this.resetPaginator();
    }
    this.calculateTotalPage();
}

createFilter(colName: string, item: LabelProps, $event?: any) {
    this.resetFilteredItem = false;
    $event.stopPropagation();
    $event.preventDefault();
    let isSelected = $event.target.classList.contains('selected-filter');
    item['isChecked'] = !isSelected;
    item['columnName'] = colName;
    this.tableState = JSON.parse(JSON.stringify(this.tableState))
    isSelected && this.removeFilter(item);
    !isSelected && this.addFilter(colName, item);
    this.debounce(() => {
        this.applyFilter(true);
    }, 1000);
}

debounce(func: Function, millisecond: number = 1000) {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
        func();
    }, millisecond);
}

addFilter(colName: string, item: LabelProps, userActionFromOtherScreen: boolean = false) {
    let filter: ColumnFilter = {
        columnName: colName,
        value: item.key
    };
    this.filters = [...this.filters, ...[filter]];
    this.userActionFromOtherScreen.userAction = userActionFromOtherScreen;
    userActionFromOtherScreen &&
        (this.userActionFromOtherScreen.filter = [...this.userActionFromOtherScreen.filter, ...[filter]]);
    this.filters.map((item) => {
        if (item.columnName == 'tags' && this.tableState?.filter?.tags && !this.tableState?.filter?.tags.includes(item.value)) {
            this.tableState.filter.tags = [...this.tableState?.filter?.tags, item.value]
        }
        else if (item.columnName == 'breach-risk' && this.tableState?.filter?.breachRisk && !this.tableState?.filter?.breachRisk.includes(item.value)) {
            this.tableState.filter.breachRisk = [...this.tableState?.filter?.breachRisk, item.value]
        }
        else if (item.columnName == 'access-privilege' && this.tableState?.filter?.accessPrivilege && !this.tableState?.filter?.accessPrivilege.includes(item.value)) {
            this.tableState.filter.accessPrivilege = [...this.tableState?.filter?.accessPrivilege, item.value]
        }
    })
}

removeFilter(item: LabelProps, userAction: boolean = false, filter?: ColumnFilter) {
    this.applyCheckboxSelection(filter, false);
    this.filters = this.filters.filter((col: any) => col['value'] !== item.key);
    if (item.columnName == "tags") {
        this.tableState.filter.tags = this.tableState?.filter?.tags?.filter((val: any) => val !== item.key);
    }
    else if (item.columnName == "breach-risk") {
        this.tableState.filter.breachRisk = this.tableState?.filter?.breachRisk?.filter((val: any) => val !== item.key);
    }
    else if (item.columnName == "access-privilege") {
        this.tableState.filter.accessPrivilege = this.tableState?.filter?.accessPrivilege?.filter((val: any) => val !== item.key);
    }
    userAction &&
        this.debounce(() => {
            this.applyFilter(true);
        }, 500);
}

applyCheckboxSelection(filter?: ColumnFilter, isChecked: boolean = false) {
    filter?.columnName === 'tags' && this.tagsFilterSelectHandler(filter, isChecked);
    filter?.columnName === 'breach-risk' && this.breachRiskFilterSelectHandler(filter, isChecked);
    filter?.columnName === 'access-privilege' && this.accessPrivilegeFilterSelectHandler(filter, isChecked);
}

removeAllFilters() {
    this.userActionFromOtherScreen.userAction = false;
    this.resetFilteredItem = true;
    this.resetAllFilters(this.defaultFilters)
    this.filters = [];
    this.tableState.filter = {
        tags: [],
        accessPrivilege: [],
        breachRisk: []
    }
    this.applyFilter(true);
}

tagsFilterSelectHandler(filter: ColumnFilter, isChecked: boolean) {
    this.tableColumnFilters.tagList.forEach((tag: LabelProps) => {
        tag.key === filter.value && (tag.isChecked = isChecked);
    });
}

breachRiskFilterSelectHandler(filter: ColumnFilter, isChecked: boolean) {
    this.tableColumnFilters.breachRiskList.forEach((risk: LabelProps) => {
        risk.key === filter.value && (risk.isChecked = isChecked);
    });
}

accessPrivilegeFilterSelectHandler(filter: ColumnFilter, isChecked: boolean) {
    this.tableColumnFilters.accessPrivilegeList.forEach((access: LabelProps) => {
        access.key === filter.value && (access.isChecked = isChecked);
    });
}

columnItemFilteredCount = (columnFilterList: LabelProps[]) => {
    return columnFilterList.filter((item: any) => item.isChecked === true).length;
};

viewDataCatalogPage(element: any) {
    this.dataService.setStoredState(this.tableState);
    let data: any = {
        dataassetId: element?.dataassetId || null,
        datasourcePath: element?.dataasset || []
    };
    this.router.navigateByUrl('/admin/actions/data-catalog', { state: data });
}


}
