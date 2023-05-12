import { Component } from '@angular/core';
import { getReportDataFilters } from './modules/module/actions/reports-data.action';
import { AppState } from './modules/module/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo-app';
  constructor(private store:Store<AppState>){}
  ngOnInit(){
    console.log("in app")
    this.store.dispatch(getReportDataFilters({ data: { filter: 'all' } }))

  }

  openBreachRisk(){
    
  }
}
