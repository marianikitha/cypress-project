import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/modules/models/api-response';
@Injectable({
    providedIn: 'root'
})
export class TagClassificatoinService {
    constructor(private http: HttpClient) {}

    getTagsList(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>('http://localhost:3000/customize/tags');
    }
    getClassificationList(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>('http://localhost:3000/customize/classification');
    }

    addTags(tag: { tagName: string }): Observable<any> {
        return this.http.put<any>('http://localhost:3000/customize/tags', {
            data: tag
        });
    }

    addClassification(category: any): Observable<any> {
        return this.http.put<any>('http://localhost:3000/customize/classification', {
            data: category
        });
    }

    deleteClassification(category: any): Observable<any> {
        return this.http.delete<any>('http://localhost:3000/customize/classification', {
            body: {
                data: category
            }
        });
    }
}
