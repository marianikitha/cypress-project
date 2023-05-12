import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { NetworkStatusComponent } from '../../modules/source-component/networkstatus/networkstatus.component';

@Injectable({
  providedIn: 'root'
})

export class NetworkStatusService {

  onlineEvent!: Observable<Event>;
  offlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openSnackBar(data: MatSnackBarConfig) {
    this._snackBar.openFromComponent(NetworkStatusComponent, data);
  }

  handleNetworkConnection() {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe((event: any) => {
      const data: MatSnackBarConfig = {
        data: {
          message: "Back to online",
          wifiIcon: "wifi",

        },
        panelClass: ['network-success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4 * 1000
      }
      this.openSnackBar(data);
    }));

    this.subscriptions.push(this.offlineEvent.subscribe((event: any) => {
      const data: MatSnackBarConfig = {
        data: {
          message: "You are offline",
          wifiIcon: "wifi_off",

        },
        panelClass: ['network-error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
      this.openSnackBar(data);
    }));
  }
}

