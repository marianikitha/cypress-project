import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, severity: string) {
    this.snackBar.open(message, "Close", {
      duration: 4 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [severity + '-snackbar']
    });
  }
}