import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Tag } from '../modules/models/tag';
import { TagClassification } from '../modules/models/tag-classification';
import { Store, select } from '@ngrx/store';
import { AppState } from '../modules/module/app.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { addClassification, addTags, deleteClassification, getAllClassification, getAllTags } from '../modules/module/actions/cutomize-tag-classification.action';
import { selectAllClassificationList, selectAllTagsList } from '../modules/module/selectors/customize-tags-classification.selector';
import { MatTableDataSource } from '@angular/material/table';
import { getReportDataFilters } from '../modules/module/actions/reports-data.action';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
@Component({
  selector: 'app-tagsandclassification',
  templateUrl: './tagsandclassification.component.html',
  styleUrls: ['./tagsandclassification.component.scss']
})
export class TagsandclassificationComponent implements OnInit {
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  dataForm: FormGroup = this.formBuilder.group({});
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedClassification = 'none';
  classificationDropdown = [
      { value: 'none', viewValue: 'None', selected: true },
      { value: 'pi', viewValue: 'PI', selected: false },
      { value: 'pii', viewValue: 'PII', selected: false },
      { value: 'sensitive', viewValue: 'Sensitive', selected: false }
  ];
  TagColumns: string[] = ['name', 'type'];
  ClassificationColumns: string[] = ['name', 'action'];

  //get list of classifications
  totalTags: { table: { datasource?: any; data: Tag[] | [] } } = { table: { datasource: [], data: [] } };
  filteredTags: any = this.totalTags?.table?.data;
  selectedTags: Tag[] | [] = [];

  totalTagsCombination: TagClassification[] | [] = [];
  selectedCombination: TagClassification[] | [] = [];
  classificationTagList: any;
  subscription: any = {
      classification: '',
      tags: ''
  };
  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.createForm();
    //get list of classifications
    // this.dataForm.controls['classificationTags'].valueChanges.subscribe((tagName) => {
    //     this._filter(tagName);
    // });
    this.store.dispatch(getAllClassification());
    this.subscription.classification = this.store
        .pipe(select(selectAllClassificationList))
        .subscribe((ClassificationListFromState) => {
            this.totalTagsCombination = ClassificationListFromState;
            this.selectedCombination = this.totalTagsCombination.filter(
                (combination) => combination?.name?.toLowerCase() === 'none'
            );
            this.classificationTagList = this.totalTagsCombination.reduce(
                (obj, item) =>
                    Object.assign(obj, {
                        [item.name]: item.combination.map(function (data: any) {
                            return data.tags.map(function (tag: any) {
                                return tag.name;
                            });
                        })
                    }),
                {}
            );
        });

    this.dataForm.controls['classification'].valueChanges.subscribe((classificationName) => {
        this.selectedCombination = this.totalTagsCombination.filter(
            (combination) => combination?.name?.toLowerCase() == classificationName?.toLowerCase()
        );
    });
    this.store.dispatch(getAllTags());
    this.subscription.tags = this.store.pipe(select(selectAllTagsList)).subscribe((TagListFromState) => {
        TagListFromState = JSON.parse(JSON.stringify(TagListFromState));
        TagListFromState.sort((a: any, b: any) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
        this.totalTags.table.datasource = new MatTableDataSource(TagListFromState);
        this.totalTags.table.datasource.sort = this.sort.toArray()[0];
        this.totalTags.table.data = TagListFromState;
        this.filteredTags = this.totalTags?.table?.data;
    });
  }

  ngOnDestroy() {
    this.subscription.tags && this.subscription.tags.unsubscribe();
    this.subscription.classification && this.subscription.classification.unsubscribe();
}

createForm(): void {
    this.dataForm = this.formBuilder.group({
        tag: [],
        classification: [],
        classificationTags: []
    });
}

createTag() {
    if (this.dataForm.controls['tag'].value) {
        let inputTag = this.dataForm.controls['tag'].value?.toLowerCase();
        if (inputTag.match('[^\\w-_]')) {
            this.openSnackBar('Special characters not allowed in Tags. Except underscore and hyphen', 'Close');
            this.dataForm.controls['tag'].reset();
            return;
        }
        // else if (inputTag.length > 50) {
        //     this.openSnackBar('Tag length should be less than 50 characters', 'Close');
        //     this.dataForm.controls['tag'].reset();
        //     return;
        // }
        this.store.dispatch(addTags({ tag: { tagName: inputTag } }));
        this.dataForm.controls['tag'].reset();
        this.store.dispatch(getReportDataFilters({ data: { filter: 'tag' } }));
        this.store.pipe(select(selectAllTagsList)).subscribe((TagListFromState) => {
            this.totalTags.table.data = TagListFromState;
            this.filteredTags = this.totalTags?.table?.data;
        });
    } else {
        this.openSnackBar('Tag cannot be empty', 'Close');
    }
}

createCombination() {
    if (this.selectedTags.length != 0) {
        this.store.dispatch(
            addClassification({
                data: {
                    category: {
                        name: this.dataForm.controls['classification'].value,
                        combination: { id: '', tags: this.selectedTags }
                    }
                }
            })
        );
        this.selectedTags = [];
        this.store.dispatch(getAllClassification());

        this.store.pipe(select(selectAllClassificationList)).subscribe((ClassificationListFromState) => {
            this.totalTagsCombination = ClassificationListFromState;
            this.selectedCombination = this.totalTagsCombination.filter(
                (combination) => combination?.name?.toLowerCase() === this.dataForm.controls['classification'].value
            );
            this.dataForm.controls['classificationTags'].reset();
        });
    }
}

removeSelectedTag(tagName: string): void {
    this.selectedTags = this.selectedTags.filter((tag: Tag) => tag.name != tagName);
}

selectTag(event: MatAutocompleteSelectedEvent): void {
    const tagName = event.option.viewValue;
    this.totalTags?.table?.data?.filter((tag: Tag) => {
        if (tag?.name?.toLowerCase() === tagName?.toLowerCase()) {
            this.selectedTags = this.selectedTags.filter((tag: Tag) => tag.name !== tagName);
            this.selectedTags = [...this.selectedTags, tag];
        }
    });
    this.tagInput.nativeElement.value = '';
    this.filteredTags = this.totalTags?.table?.data;
}

onItemSelect(item: any[]) {
    this.selectedTags = item;
    // item = item[item.length - 1];
    // item.length && (this.selectedTags = [...this.filteredTags, ...item]);
}

private _filter(tagName: string): void {
    this.filteredTags = this.totalTags?.table?.data.filter((tag: Tag) =>
        tag?.name?.toLowerCase().includes(tagName?.toLowerCase())
    );
}

openDialog(data: any) {
    // let dialogRef = this.dialog.open(DeleteItemsDialogComponent, {
    //     data: {
    //         view: 'classification'
    //     }
    // });
    // dialogRef.afterClosed().subscribe((res) => {
    //     if (res) {
    //         this.deleteClassification(data);
    //     }
    // });
}

deleteClassification(deletedCombination: any) {
    this.store.dispatch(
        deleteClassification({
            data: {
                category: {
                    name: this.dataForm.controls['classification'].value,
                    combination: deletedCombination
                }
            }
        })
    );
    this.store.dispatch(getAllClassification());

    this.store.pipe(select(selectAllClassificationList)).subscribe((ClassificationListFromState) => {
        this.totalTagsCombination = ClassificationListFromState;
        this.selectedCombination = this.totalTagsCombination.filter(
            (combination) => combination?.name?.toLowerCase() === this.dataForm.controls['classification'].value
        );
    });
}

openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
        duration: 4 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-style']
    });
}

tagsTooltip(tags: any) {
    return tags.map((e: any) => e.name).join(', ');
}


}
