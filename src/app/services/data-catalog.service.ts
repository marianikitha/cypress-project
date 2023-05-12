import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/modules/models/api-response';
import { Country } from 'src/app/modules/models/country';
import { State } from 'src/app/modules/models/state';
// import { AuthorizationService } from './../../../../../core/services/auth/auth.service';
// import { selectUserTokenInfo } from 'src/app/modules/core/modules/app-redux/redux/selectors/keycloak-auth.selector';
// import { UserTokenInfo } from 'src/app/modules/core/models/keycloak-login';
import { Store } from '@ngrx/store';
import { AppState } from '../modules/module/app.state';

@Injectable({
    providedIn: 'root'
})
export class DataCatalogService {
    groupName: string = '';
    constructor(private http: HttpClient,
        //  private authService: AuthorizationService,
          private store: Store<AppState>,) { }

    getPayload(payload: any) {
        return JSON.stringify(payload);
    }

    putPayload(payload: any) {
        return {
            data: payload.data
        };
    }

    deletePayload(payload: any) {
        return {
            body: {
                data: payload.data
            }
        };
    }

    jsonResult(data: any) {
        return {
            data: data,
            success: true,
            error: {
                message: ''
            }
        };
    }

    errorMsg(error: any): Observable<ApiResponse> {
        return of({
            data: '',
            success: false,
            error: {
                message: error
            }
        });
    }

    // getCountriesList(): Observable<ApiResponse> {
    //     return this.http.get<Country>('http://localhost:3000/assets/data/countries.json').pipe(
    //         map((data: Country) => {
    //             return this.jsonResult(data);
    //         }),
    //         catchError((error: any): Observable<ApiResponse> => {
    //             return this.errorMsg(error);
    //         })
    //     );
    // }

    // getEuCountriesList(): Observable<ApiResponse> {
    //     return this.http.get<Country>('http://localhost:3000/assets/data/eu-countries.json').pipe(
    //         map((data: Country) => {
    //             return this.jsonResult(data);
    //         }),
    //         catchError((error: any): Observable<ApiResponse> => {
    //             return this.errorMsg(error);
    //         })
    //     );
    // }

    // getStatesList(): Observable<ApiResponse> {
    //     return this.http.get<State>('http://localhost:3000/assets/data/us-states.json').pipe(
    //         map((data: State) => {
    //             return this.jsonResult(data);
    //         }),
    //         catchError((error: any): Observable<ApiResponse> => {
    //             return this.errorMsg(error);
    //         })
    //     );
    // }

    getTreeData(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('http://localhost:3000/action/data', this.putPayload(payload));
    }

    getTreeDataBySearchKeyword(payload: any): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`/action/data/search?data=${this.getPayload(payload)}`);
    }

    getSourcePurposeList(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>('http://localhost:3000/action/source-purpose');
    }

    getSubjectTypeList(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>('http://localhost:3000/action/subject-type');
    }

    getDataDetails(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('http://localhost:3000/action/data/details', this.putPayload(payload));
    }

    getMetadata(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('http://localhost:3000/action/data/metadata', this.putPayload(payload));
    }

    getUsersWithAccess(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('http://localhost:3000/action/data/users', this.putPayload(payload));
    }

    validateEmail(email: string) {
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    // getAdUsers(payload: { authProviderName: string; clientId: string; tenantId: string }): Observable<ApiResponse> {
    //     if (payload.authProviderName == 'microsoft') {
    //         return from(this.authService.getAdUsersList(payload.clientId, payload.tenantId)).pipe(
    //             map((data: any) => {
    //                 let validEmailList = data?.value?.filter((value: any) => {
    //                     return this.validateEmail(value['userPrincipalName'])
    //                 })
    //                 return this.jsonResult(validEmailList);
    //             }),
    //             catchError((error: any): Observable<ApiResponse> => {
    //                 return this.errorMsg(error);
    //             })
    //         );
    //     }
    //     else if (payload.authProviderName == 'auth0') {
    //         let adUsers = this.http.get<ApiResponse>('/action/data/adusers');
    //         return adUsers
    //     }
    //     else if (payload.authProviderName == 'keycloak') {
    //         this.store.select(selectUserTokenInfo).subscribe((userTokenInfo: UserTokenInfo) => {
    //             this.groupName = userTokenInfo.groupName;
    //         })
    //         if (this.groupName != '') {
    //             let adUsers = this.http.get<ApiResponse>(`/action/data/adusers?groupName=${this.groupName}`);
    //             return adUsers
    //         }
    //         return this.errorMsg("group name not found")
    //     }
    //     else {
    //         return this.errorMsg('invalid Auth Provider');
    //     }
    // }

    addDataOwner(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('http://localhost:3000/action/data/dataowner', this.putPayload(payload));
    }

    addDataSourcePurpose(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('http://localhost:3000/action/data/source-purpose', this.putPayload(payload));
    }

    addDataSubjectType(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('http://localhost:3000/action/data/subject-type', this.putPayload(payload));
    }

    addDataLocation(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('http://localhost:3000/action/data/location', this.putPayload(payload));
    }

    addDataRetention(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('http://localhost:3000/action/data/retention', this.putPayload(payload));
    }

    addDataHasMinorInformation(payload: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('http://localhost:3000/action/data/minor-data', this.putPayload(payload));
    }

    deleteDataSourcePurpose(payload: any): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>('http://localhost:3000/action/data/source-purpose', this.deletePayload(payload));
    }

    deleteDataSubjectType(payload: any): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>('http://localhost:3000/action/data/subject-type', this.deletePayload(payload));
    }

    deleteDataLocation(payload: any): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>('http://localhost:3000/action/data/location', this.deletePayload(payload));
    }
}
