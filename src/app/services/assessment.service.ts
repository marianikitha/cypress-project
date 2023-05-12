
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/modules/models/api-response';


@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private http: HttpClient) { }
  getPayload(payload: any) {
    return JSON.stringify(payload);
}

getAssessmentData(assessmentFilter: any): Observable<ApiResponse> {
    return this.http.put<any>('http://localhost:3000/assessment/data', {
        data: assessmentFilter
    });
}

getAssessmentDatause(assessmentFilter: any): Observable<ApiResponse> {
    return this.http.put<any>('http://localhost:3000/assessment/data-use', {
        data: assessmentFilter
    });
}

getAssessmentDataByUsage(assessmentFilter: any): Observable<ApiResponse> {
    return this.http.put<any>('http://localhost:3000/assessment/data-by-usage', {
        data: assessmentFilter
    });
}
}
