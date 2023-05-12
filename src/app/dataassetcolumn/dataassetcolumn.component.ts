import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dataassetcolumn',
  templateUrl: './dataassetcolumn.component.html',
  styleUrls: ['./dataassetcolumn.component.scss']
})
export class DataassetcolumnComponent implements OnInit {

  constructor(  private dialogRef: MatDialogRef<DataassetcolumnComponent>) { }

  ngOnInit(): void {
  }
  closeIcon() {
    this.closeDialog();
}

closeDialog() {
    this.dialogRef.close();
}

}
