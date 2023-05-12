
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/modules/models/api-response';

@Injectable({
    providedIn: 'root'
})

export class ReportsService {

    constructor(private http: HttpClient) { }

    getPayload(payload: any) {
        return JSON.stringify(payload);
    }

    getReportDataCount(assessmentFilter: any): Observable<ApiResponse> {
        return this.http.put<any>('http://localhost:3000/reports/records', {
            data: assessmentFilter
        });
    }

    getReportDataFilters(payload: any): Observable<ApiResponse> {
        console.log(payload)
        return this.http.get<any>(`http://localhost:3000/reports/filters?data=${this.getPayload(payload)}`);
    }

    getReportDataColumns(payload: any): Observable<ApiResponse> {
        return this.http.get<any>(`http://localhost:3000/reports/columns?data=${this.getPayload(payload)}`);
    }

    sendAssessmentDataReportInEmail(payload: any): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`http://localhost:3000/reports/email?data=${this.getPayload(payload)}`);
    }
}

