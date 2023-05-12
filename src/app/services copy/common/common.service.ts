import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReportDataFilters } from '../../modules/app-redux/redux/actions/reports-data.action';
import { AppState } from '../../modules/app-redux/redux/app.state';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private store: Store<AppState>) { }

  getCommonApis() {
    this.store.dispatch(getReportDataFilters({ data: { filter: 'all' } }))
    }
}
