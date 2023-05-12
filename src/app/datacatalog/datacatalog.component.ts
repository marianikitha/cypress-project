import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { AppState } from '../modules/module/app.state';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SourcePurpose } from '../modules/models/source-purpose';
import { SubjectType } from '../modules/models/subject-type';
import { Country } from '../modules/models/country';
import { State } from '../modules/models/state';
import { Observable } from 'rxjs/internal/Observable';
import { DataDetails } from '../modules/models/data-details';
import { MetaData } from '../modules/models/metadata';
import { Users } from '../modules/models/users';
import { DataLocation } from '../modules/models/location';
import { Retention } from '../modules/models/retention';
import { addDataHasMinorInformation, addDataLocation, addDataRetention, addDataSourcePurpose, addDataSubjectType, clearDataDetails, clearMetadata, clearUsersWithAccess, deleteDataLocation, deleteDataSourcePurpose, deleteDataSubjectType, getAdUsers, getAllCountries, getAllSourcePurpose, getAllStates, getAllSubjectType, getDataDetails, getMetadata, getUsersWithAccess } from '../modules/module/actions/actions-data-catalog.action';
import { selectAdUsers, selectAllCountries, selectAllSourcePurpose, selectAllStates, selectAllSubjectType, selectDataDetails, selectMetadata, selectUsersWithAccess } from '../modules/module/selectors/actions-data-catalog.selector';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { MatTab } from '@angular/material/tabs';
import { CanColor, CanDisableRipple } from '@angular/material/core';
import { AdUsers } from '../modules/models/ad-users';
export declare class MatTabChangeEvent {
  /** Index of the currently-selected tab. */
  index: number;
  /** Reference to the currently-selected tab. */
  tab: MatTab;
}
/** Possible positions for the tab header. */
export declare type MatTabHeaderPosition = 'above' | 'below';
/** @docs-private */
declare const _MatTabGroupMixinBase: import("@angular/material/core")._Constructor<CanColor> & import("@angular/material/core")._AbstractConstructor<CanColor> & import("@angular/material/core")._Constructor<CanDisableRipple> & import("@angular/material/core")._AbstractConstructor<CanDisableRipple> & {
  new (_elementRef: ElementRef): {
      _elementRef: ElementRef;
  };
};
interface MatTabGroupBaseHeader {
  _alignInkBarToSelectedTab: () => void;
  focusIndex: number;
}

interface DataRetention {
  type: string;
  duration: number;
  tillDate: Date;
}
@Component({
  selector: 'app-datacatalog',
  templateUrl: './datacatalog.component.html',
  styleUrls: ['./datacatalog.component.scss']
})
export class DatacatalogComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);

    // @ViewChild(MatPaginator) paginator!: MatPaginator;

    selectedDatasource: any;
    constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private cdref: ChangeDetectorRef
    ) {}

    // ngAfterViewInit() {
    //     // this.dataSource.paginator = this.paginator;
    // }

    panelOpenState = true;

    sourcePurposeForm: any;
    locationForm: any;
    subjectTypeForm: any;
    retentionForm: any;
    hasMinorDataForm: any;

    sourcePurposeList: SourcePurpose[] = [];
    subjectTypeList: SubjectType[] = [];
    countriesList: Country[] = [];
    statesList: State[] = [];
    retentionTypeList: any[] = [
        { name: 'Transient', type: 'transient' },
        { name: 'Days', type: 'day' },
        { name: 'Months', type: 'month' },
        { name: 'Years', type: 'year' },
        { name: 'Indefinite', type: 'indefinite' }
    ];
    hasMinorDataList: any[] = [
        { name: 'None', type: 'none' },
        { name: 'Yes', type: 'yes' },
        { name: 'No', type: 'no' }
    ];
    adUsersList: AdUsers[] = [];

    // treeData: TreeData[] = [];

    countriesList$: Observable<Country[]> | undefined;
    statesList$: Observable<State[]> | undefined;

    dataDetails: DataDetails = {
        isValid: false,
        disableColumDetails: false,
        datasourcePath: [],
        type: '',
        category: [],
        tags: [],
        dataOwner: [],
        recentOwners: [],
        dataassetDelimiter: ''
    };
    metadata: MetaData = {
        datasourcePath: [],
        sourcePurpose: [],
        location: [],
        retention: { type: '', duration: 0, tillDate: 0 },
        subjectType: [],
        hasMinorData: false
    };
    usersWithAccess: { users: Users[] } = {
        users: []
    };
    dataSourcePurposeTableList: SourcePurpose[] = [];
    dataSubjectTypeTableList: SubjectType[] = [];
    dataLocationTableList: DataLocation[] = [];
    // usersTableList: Users[] = [];
    usersTableSorted: any;
    dataRetention: Retention = {
        type: '',
        duration: 0,
        tillDate: 0
    };

    dataHasMinorInformation: boolean | null | undefined;

    displayedSourcePurposeColumns: string[] = ['sl_no', 'name', 'action'];
    displayedDataSubjectTypeColumns: string[] = ['sl_no', 'name', 'action'];
    displayedDataSubjectLocationColumns: string[] = ['sl_no', 'name', 'action'];
    displayedUsersColumns: string[] = ['name', 'column_tags', 'active_used'];
    displayedUsersColumnsWithExpand: string[] = [...this.displayedUsersColumns];
    columnsToDisplay: string[] = ['column_name', 'tags'];
    expandedElement: any = null;
    subscription: any = {
        selectAdConfiguration: '',
        sourcePurpose: '',
        subjectType: '',
        countries: '',
        states: '',
        adUsers: '',
        metaData: '',
        dataDetails: ''
    };
    isHistory: boolean = false;
    usersTableColumnList: Users[] = [];

    start: number = 0;
    limit: number = 15;
    end: number = this.limit + this.start;
    userWithAccessDataLoading: boolean = true;

    ngOnInit(): void {
        this.metadataFormBuilder();
    }

    ngAfterViewInit() {
        this.getDataFromLink();
        setTimeout(() => {
            this.selectAllDataListFromStore();
        }, 10);
        setTimeout(() => {
            this.getAllData();
        }, 500);
    }

    ngOnDestroy() {
        this.subscription.selectAdConfiguration && this.subscription.selectAdConfiguration.unsubscribe();
        this.subscription.sourcePurpose && this.subscription.sourcePurpose.unsubscribe();
        this.subscription.subjectType && this.subscription.subjectType.unsubscribe();
        this.subscription.countries && this.subscription.countries.unsubscribe();
        this.subscription.states && this.subscription.states.unsubscribe();
        this.subscription.adUsers && this.subscription.adUsers.unsubscribe();
        this.subscription.metaData && this.subscription.metaData.unsubscribe();
        this.subscription.dataDetails && this.subscription.dataDetails.unsubscribe();
        this.subscription.usersWithAccess && this.subscription.usersWithAccess.unsubscribe();
        this.clearDataCatalogData();
    }

    clearDataCatalogData() {
        this.store.dispatch(clearUsersWithAccess());
        this.store.dispatch(clearDataDetails());
        this.store.dispatch(clearMetadata());
    }

    getDataFromLink() {
        if (history.state && history?.state?.datasourcePath?.length > 0) {
            this.fetchDataInformation(history.state);
        } else {
            this.fetchDataInformation(null);
        }
    }

    metadataFormBuilder() {
        this.sourcePurposeFormBuilder();
        this.locationFormBuilder();
        this.subjectTypeFormBuilder();
        this.retentionFormBuilder();
        this.hasMinorDataFormBuilder();
    }

    getAllData() {
        if (!this.sourcePurposeList.length) this.store.dispatch(getAllSourcePurpose());
        if (!this.subjectTypeList.length) this.store.dispatch(getAllSubjectType());
        if (!this.countriesList.length) this.store.dispatch(getAllCountries());
        if (!this.statesList.length) this.store.dispatch(getAllStates());
        // this.subscription.selectAdConfiguration = this.store.select(selectAdConfiguration).subscribe((config) => {
        //     let payload = {
        //         data: {
        //             authProviderName: config?.authProvider?.name || '',
        //             clientId: config?.authProvider?.clientId || '',
        //             tenantId: config?.authProvider?.tenantId || ''
        //         }
        //     };
        //     if (!this.adUsersList.length) this.store.dispatch(getAdUsers(payload));
        // });
        // this.fetchDataInformation();
    }

    sourcePurposeFormBuilder() {
        this.sourcePurposeForm = this.formBuilder.group({
            consent: [
                ,
                {
                    // validators: [Validators.required],
                    updateOn: 'change'
                }
            ]
        });
    }

    locationFormBuilder() {
        this.locationForm = this.formBuilder.group({
            country: [
                ,
                {
                    // validators: [Validators.required],
                    updateOn: 'change'
                }
            ],
            state: [
                ,
                {
                    // validators: [Validators.required],
                    updateOn: 'change'
                }
            ]
        });
    }

    subjectTypeFormBuilder() {
        this.subjectTypeForm = this.formBuilder.group({
            subjectType: [
                ,
                {
                    // validators: [Validators.required],
                    updateOn: 'change'
                }
            ]
        });
    }

    retentionFormBuilder() {
        this.retentionForm = this.formBuilder.group({
            type: [
                ,
                {
                    // validators: [Validators.required],
                    updateOn: 'change'
                }
            ],
            duration: [
                ,
                {
                    // validators: [Validators.required],
                    updateOn: 'change'
                }
            ]
        });
    }

    hasMinorDataFormBuilder() {
        this.hasMinorDataForm = this.formBuilder.group({
            hasMinorData: [
                ,
                {
                    // validators: [Validators.required],
                    updateOn: 'change'
                }
            ]
        });
    }

    // public errorHandling = (control: string, error: string) => {
    //   return this.retentionForm.controls[control].hasError(error);
    // };

    selectAllDataListFromStore() {
        // Select all source purpose from state
        this.subscription.sourcePurpose = this.store
            .pipe<SourcePurpose[]>(select(selectAllSourcePurpose))
            .subscribe((sourcePurposeFromState: SourcePurpose[]) => {
                this.sourcePurposeList = sourcePurposeFromState;
            });

        // Select all subject type from state
        this.subscription.subjectType = this.store
            .pipe<SubjectType[]>(select(selectAllSubjectType))
            .subscribe((subjectTypeFromState: SubjectType[]) => {
                this.subjectTypeList = subjectTypeFromState;
            });

        // Select all countries from state
        this.subscription.countries = this.store
            .pipe<Country[]>(select(selectAllCountries))
            .subscribe((countriesFromState: Country[]) => {
                this.countriesList = countriesFromState;
                this.createCountryFilter();
            });

        // Select all states from state
        this.subscription.states = this.store
            .pipe<State[]>(select(selectAllStates))
            .subscribe((statesFromState: State[]) => {
                this.statesList = statesFromState;
                this.createStateFilter();
            });

        // Select Ad users from state
        this.subscription.adUsers = this.store
            .pipe<AdUsers[]>(select(selectAdUsers))
            .subscribe((adUsersFromState: AdUsers[]) => {
                this.adUsersList = adUsersFromState;
            });

        this.subscription.usersWithAccess = this.store
            .pipe<any>(select(selectUsersWithAccess))
            .subscribe(async (usersWithAccessFromState: any) => {
                if (usersWithAccessFromState != undefined) {
                    this.usersTableSorted = JSON.parse(JSON.stringify(usersWithAccessFromState));
                    if (this.usersTableSorted.length) {
                        this.dataSource.data = await this.getTableData(this.start, this.end);
                        this.updateIndex();
                    }
                }
                this.userWithAccessDataLoading = false;
            });
        this.selectDataInformation();

        this.selectMetadataForSelectedData();
    }

    onTableScroll(e: any) {
        // console.log(e);
        const tableViewHeight = e.target.offsetHeight; // viewport
        const tableScrollHeight = e.target.scrollHeight; // length of all table
        const scrollLocation = e.target.scrollTop; // how far user scrolled

        // If the user has scrolled within 200px of the bottom, add more data
        const buffer = 50;
        const limit = tableScrollHeight - tableViewHeight - buffer;
        // console.log('tableScrollHeight', tableScrollHeight)
        // console.log('tableViewHeight', tableViewHeight)
        // console.log('limit', limit)
        if (scrollLocation > limit) {
            let newRows = this.getTableData(this.start, this.end);
            let oldRows = this.dataSource.data;
            //   console.log('oldRows', oldRows)
            //   oldRows.push(newRows);
            let newData = [...oldRows, ...newRows];
            //   console.log('newData 2', newData)
            this.dataSource.data = newData;
            //   this.dataSource.data = this.dataSource.concat(data);
            this.updateIndex();
        }
    }

    getTableData(start: number, end: number) {
        // console.log('START: ', start, 'END: ', end);

        // console.log('this.usersTableSorted', this.usersTableSorted)
        return this.usersTableSorted.filter((value: any, index: number) => index >= start && index < end);
        // else
        //     return []
    }

    updateIndex() {
        // console.log('updateIndex')
        this.start = this.end;
        this.end = this.limit + this.start;
    }

    createCountryFilter() {
        this.countriesList$ = this.locationForm.get('country').valueChanges.pipe(
            startWith(''),
            map((value: any) => (typeof value === 'string' ? value : value?.label)),
            map((label: any) => (label ? this._filterCountries(label) : this.countriesList.slice()))
        );
    }

    createStateFilter() {
        this.statesList$ = this.locationForm.get('state').valueChanges.pipe(
            startWith(''),
            map((value: any) => (typeof value === 'string' ? value : value?.label)),
            map((label: any) => (label ? this._filterStates(label) : this.statesList.slice()))
        );
    }

    displayCountry(data: Country): string {
        return data && data.label ? data.label : '';
    }

    displayState(data: State): string {
        return data && data.label ? data.label : '';
    }

    private _filterCountries(label: string): Country[] {
        const filterlabel = label.toLowerCase();

        return this.countriesList.filter((option: Country) => option.label.toLowerCase().includes(filterlabel));
    }

    private _filterStates(label: string): State[] {
        const filterValue = label.toLowerCase();

        return this.statesList.filter((option: State) => option.label.toLowerCase().includes(filterValue));
    }

    showOrHideLocationState() {
        let country: Country = this.locationForm.get('country').value;
        if (country === null) {
            return true;
        }
        if (country.code === 'US') return false;
        else return true;
    }

    showOrHideRetentionTime() {
        let type = this.retentionForm.get('type').value;
        if (type === null) {
            return true;
        }
        if (type === 'transient' || type === 'indefinite') return true;
        else return false;
    }

    clearDataCatalogDataVariables() {
        this.dataSource.data = [];
        this.dataDetails = {
            isValid: false,
            disableColumDetails: false,
            datasourcePath: [],
            type: '',
            category: [],
            tags: [],
            dataOwner: [],
            recentOwners: [],
            dataassetDelimiter: ''
        };
        this.metadata = {
            datasourcePath: [],
            sourcePurpose: [],
            location: [],
            retention: { type: '', duration: 0, tillDate: 0 },
            subjectType: [],
            hasMinorData: false
        };
    }

    fetchDataInformation(node: any) {
        this.clearDataCatalogData();
        this.clearDataCatalogDataVariables();

        (this.start = 0), (this.end = this.limit + this.start);

        if (!node) {
            this.selectedDatasource = null;

            this.dataDetails = {
                isValid: false,
                disableColumDetails: false,
                datasourcePath: [],
                type: '',
                category: [],
                tags: [],
                dataOwner: [],
                recentOwners: [],
                dataassetDelimiter: ''
            };

            return;
        }
        this.selectedDatasource = node;
        this.isHistory = this.selectedDatasource?.history || false;
        this.selectedDatasource = {
            ...this.selectedDatasource,
            dataassetId: this.selectedDatasource?.dataassetId || null
        };
        let payload = {
            data: {
                datasourcePath: this.selectedDatasource?.datasourcePath || [],
                dataassetId: this.selectedDatasource?.dataassetId || null
            }
        };
        this.store.dispatch(getDataDetails(payload));
        this.store.dispatch(getMetadata(payload));
        if (this.selectedDatasource.dataassetId != null && this.selectedTab === 'ACCESS') {
            this.userWithAccessDataLoading = true;
            this.store.dispatch(getUsersWithAccess(payload));
        }
    }

    selectedTab: string = '';
    onTabChange(event: MatTabChangeEvent) {
        this.selectedTab = event.tab.textLabel;
        // console.log(this.selectedTab);

        if (this.selectedTab === 'ACCESS') {
            (this.start = 0), (this.end = this.limit + this.start);
            let payload = {
                data: {
                    datasourcePath: this.selectedDatasource?.datasourcePath || [],
                    dataassetId: this.selectedDatasource?.dataassetId || null
                }
            };
            if (this.selectedDatasource.dataassetId != null && this.usersTableSorted.length == 0) {
                this.userWithAccessDataLoading = true;
                this.store.dispatch(getUsersWithAccess(payload));
            }
        }
    }

    selectDataInformation() {
        this.subscription.metaData = this.store
            .pipe<MetaData>(select(selectMetadata))
            .subscribe((metadataFromState: MetaData) => {
                if (metadataFromState != undefined) {
                    this.metadata = metadataFromState;
                    this.dataSourcePurposeTableList = metadataFromState.sourcePurpose;
                    this.dataSubjectTypeTableList = metadataFromState.subjectType;
                    this.dataLocationTableList = metadataFromState.location;
                    this.dataRetention =
                        Object.keys(metadataFromState.retention).length > 0
                            ? metadataFromState.retention
                            : {
                                  type: '',
                                  duration: 0,
                                  tillDate: 0
                              };
                    this.dataHasMinorInformation = metadataFromState.hasMinorData;
                }
            });
    }

    selectMetadataForSelectedData() {
        this.subscription.dataDetails = this.store
            .pipe<DataDetails>(select(selectDataDetails))
            .subscribe((dataDetailsFromState: DataDetails) => {
                this.dataDetails = {
                    ...dataDetailsFromState,
                    isValid: dataDetailsFromState.isValid || false,
                    disableColumDetails: dataDetailsFromState.disableColumDetails || false,
                    datasourcePath: dataDetailsFromState.datasourcePath || [],
                    type: dataDetailsFromState.type || '',
                    category: dataDetailsFromState.category || [],
                    tags: dataDetailsFromState.tags || [],
                    dataOwner: dataDetailsFromState.dataOwner || [],
                    recentOwners: dataDetailsFromState.recentOwners || [],
                    dataassetDelimiter: dataDetailsFromState.dataassetDelimiter || ''
                };
            });
    }

    // BEGIN - ADDING METADATA
    addDataSourcePurpose() {
        let dataSourcePurpose: SourcePurpose;
        dataSourcePurpose = this.sourcePurposeForm.get('consent').value;

        if (dataSourcePurpose === null) {
            this.openSnackBar('Consent cannot be empty', 'Close');
            return;
        }

        let postData = {
            data: {
                datasourcePath: this.selectedDatasource?.datasourcePath || [],
                dataassetId: this.selectedDatasource?.dataassetId || null,
                sourcePurpose: dataSourcePurpose
            }
        };
        this.store.dispatch(addDataSourcePurpose(postData));
        this.resetSourcePurposeForm();
    }

    addDataLocation() {
        let country: Country = this.locationForm.get('country').value;
        if (typeof country === 'string') {
            this.openSnackBar('Please select a valid data subject location', 'Close');
            return;
        }
        if (!country) {
            this.openSnackBar('Data subject location cannot be empty', 'Close');
            return;
        }
        let state: State = this.locationForm.get('state').value;
        if (country.code === 'US') {
            if (typeof state === 'string') {
                this.openSnackBar('Please select a valid data subject state', 'Close');
                return;
            }
            if (!state) {
                this.openSnackBar('Data subject state cannot be empty', 'Close');
                return;
            }
        }
        let postData = {
            data: {
                datasourcePath: this.selectedDatasource?.datasourcePath || [],
                dataassetId: this.selectedDatasource?.dataassetId || null,
                location: {
                    country: country.label,
                    state: state?.label || ''
                }
            }
        };

        this.store.dispatch(addDataLocation(postData));
        this.resetLocationForm();
    }

    addDataSubjectType() {
        let dataSubjectType: SubjectType;
        dataSubjectType = this.subjectTypeForm.get('subjectType').value;
        if (dataSubjectType === null) {
            this.openSnackBar('Data subject type cannot be empty', 'Close');
            return;
        }
        let postData = {
            data: {
                datasourcePath: this.selectedDatasource?.datasourcePath || [],
                dataassetId: this.selectedDatasource?.dataassetId || null,
                subjectType: dataSubjectType
            }
        };
        this.store.dispatch(addDataSubjectType(postData));
        this.resetSubjectTypeForm();
    }

    addDataRetention() {
        let retention: string = '';
        let duration: number = 0;
        let tillDate: number = 0;
        let date: Date = new Date();

        retention = this.retentionForm.get('type').value;
        duration = this.retentionForm.get('duration').value;
        if (retention == null) {
            this.openSnackBar('Retention type cannot be empty', 'Close');
            return;
        }
        if (retention === 'day' || retention === 'month' || retention === 'year') {
            if (duration == null || duration === 0) {
                this.openSnackBar('Please enter a valid retention time', 'Close');
                return;
            }
        }

        if (retention === 'day') {
            if (duration > 30) {
                this.openSnackBar('Day should be less than 30', 'Close');
                return;
            }
            tillDate = date.setDate(date.getDate() + duration);
        } else if (retention === 'month') {
            if (duration > 12) {
                this.openSnackBar('Month should be less than 12', 'Close');
                return;
            }
            tillDate = date.setMonth(date.getMonth() + duration);
        } else if (retention === 'year') {
            if (duration > 10) {
                this.openSnackBar('Year should be less than 10', 'Close');
                return;
            }
            tillDate = date.setFullYear(date.getFullYear() + duration);
        } else {
            tillDate = 0;
            duration = 0;
        }

        let postData = {
            data: {
                datasourcePath: this.selectedDatasource?.datasourcePath || [],
                dataassetId: this.selectedDatasource?.dataassetId || null,
                retention: {
                    type: retention,
                    duration: duration,
                    tillDate: tillDate
                }
            }
        };

        this.store.dispatch(addDataRetention(postData));
        this.resetRetentionForm();
    }

    isColumnDetailsDisabled() {
        if (this.dataDetails?.disableColumDetails) {
            return this.dataDetails?.disableColumDetails;
        } else {
            return this.isHistory || !this.selectedDatasource?.dataassetId;
        }
    }
    addDataHasMinorInformation() {
        let dataHasMinorInformation: string = '';
        dataHasMinorInformation = this.hasMinorDataForm.get('hasMinorData').value;

        if (dataHasMinorInformation === null) {
            this.openSnackBar('Has minor data cannot be empty', 'Close');
            return;
        }

        let hasMinorData: boolean | null;

        if (dataHasMinorInformation === 'yes') {
            hasMinorData = true;
        } else if (dataHasMinorInformation === 'no') {
            hasMinorData = false;
        } else {
            hasMinorData = null;
        }

        let postData = {
            data: {
                datasourcePath: this.selectedDatasource?.datasourcePath || [],
                dataassetId: this.selectedDatasource?.dataassetId || null,
                hasMinorData: hasMinorData
            }
        };

        this.store.dispatch(addDataHasMinorInformation(postData));
        this.resetHasMinorDataForm();
    }
    // END - ADDING METADATA

    // BEGIN RESET FORM DATA

    resetSourcePurposeForm() {
        this.sourcePurposeForm.reset('');
    }
    resetLocationForm() {
        this.locationForm.reset('');
    }
    resetSubjectTypeForm() {
        this.subjectTypeForm.reset('');
    }
    resetRetentionForm() {
        this.retentionForm.reset('');
    }
    resetHasMinorDataForm() {
        this.hasMinorDataForm.reset('');
    }

    // END RESET FORM DATA

    // BEGIN DELETE METADATA FROM TABLE DATA

    deleteDataSourcePurpose(sourcePurpose: any) {
        let postData = {
            data: {
                datasourcePath: this.selectedDatasource?.datasourcePath || [],
                dataassetId: this.selectedDatasource?.dataassetId || null,
                sourcePurpose: sourcePurpose
            }
        };
        this.store.dispatch(deleteDataSourcePurpose(postData));
    }
    deleteDataSubjectType(subjectType: any) {
        let postData = {
            data: {
                datasourcePath: this.selectedDatasource?.datasourcePath || [],
                dataassetId: this.selectedDatasource?.dataassetId || null,
                subjectType: subjectType
            }
        };
        this.store.dispatch(deleteDataSubjectType(postData));
    }
    deleteDataLocation(location: any) {
        let postData = {
            data: {
                datasourcePath: this.selectedDatasource?.datasourcePath || [],
                dataassetId: this.selectedDatasource?.dataassetId || null,
                location: location
            }
        };
        this.store.dispatch(deleteDataLocation(postData));
    }

    // Add Data Owner
    addDataOwnerDialog() {
        // this.dialog.open(AddOwnerDialogComponent, {
        //     data: {
        //         dialogHeader: 'Assign New Data Owner',
        //         adUsersList: this.adUsersList,
        //         datasourcePath: this.selectedDatasource?.datasourcePath || [],
        //         dataassetId: this.selectedDatasource?.dataassetId || null
        //     }
        // });
    }
    getColumnDetails(dataasset: string[], dataassetId: string | null) {
        // this.dialog.open(DataassetColumnDetailsComponent, {
        //     maxWidth: '100vw',
        //     maxHeight: '100vh',
        //     height: '100%',
        //     width: '100%',
        //     data: {
        //         datasourcePath: dataasset || [],
        //         dataassetId: dataassetId || null
        //     }
        // });
    }

    getComma(dataOwner: any[], i: number) {
        if (dataOwner?.length - 1 === i) {
            return '';
        } else {
            return ',  ';
        }
    }

    retentionFormatter(dataRetention: Retention) {
        if (dataRetention?.type === 'transient' || dataRetention?.type === 'indefinite') {
            return dataRetention?.type;
        } else {
            return dataRetention?.duration + ' ' + dataRetention?.type + (dataRetention.duration > 1 ? 's' : '');
        }
    }

    // (dataRetention?.type === 'transient' ||
    // dataRetention?.type === 'indefinite'
    // ? ''
    // : dataRetention?.duration) +
    // ' ' +
    // (dataRetention?.type) +
    // (dataRetention.duration > 1 ? 's' : '')

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 4 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-style']
        });
    }
 
   

}
