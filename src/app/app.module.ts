import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Comp1Component } from './comp1/comp1.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StateObservable, Store, StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AppMetaReducers, AppReduxModule } from './modules/app-redux.module';
import { HttpClientModule } from '@angular/common/http';
import { AppReducers } from './modules/module/app.reducer';
import { AppEffects } from './modules/module/app.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ApiInterceptor } from './modules/api-interceptor';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataassetcolumnComponent } from './dataassetcolumn/dataassetcolumn.component';
import { TagsandclassificationComponent } from './tagsandclassification/tagsandclassification.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonComponent } from './button/button.component';
import { DatacatalogComponent } from './datacatalog/datacatalog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { MatTreeModule } from '@angular/material/tree';
@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
    DataassetcolumnComponent,
    TagsandclassificationComponent,
    ButtonComponent,
    DatacatalogComponent,
    TreeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    AppReduxModule,
    HttpClientModule,
    MatTooltipModule,
    MatMenuModule,
    MatBadgeModule,
    ClipboardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatTreeModule
    
    
    // StoreModule.forRoot(AppReducers, { metaReducers: AppMetaReducers }),
    //     EffectsModule.forRoot(AppEffects),
    //     StoreRouterConnectingModule.forRoot(),
    //     StoreDevtoolsModule.instrument({
    //         maxAge: 25,
    //         logOnly: environment.production
    //     }),
    // StoreModule.forRoot({}),
    // StoreModule.forRoot( AppReducers)
    
  ],
  providers: [Store,ApiInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
