import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from 'src/environments/environment';
import { AppReducers } from 'src/app/modules/module/app.reducer';
import { AppEffects } from 'src/app/modules/module/app.effects';
import { AppState } from 'src/app/modules/module/app.state';

export const AppMetaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forRoot(AppReducers, { metaReducers: AppMetaReducers }),
        EffectsModule.forRoot(AppEffects),
        StoreRouterConnectingModule.forRoot(),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        })
    ]
})
export class AppReduxModule {}
