import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app.config';

@Injectable({
    providedIn: 'root'
})

export class JwtAuthService {

    adminEmail: string = '';
    superAdminEmail: string = '';
    userEmail: string = '';
    adminPassword: string = '';
    superAdminPassword: string = '';
    userPassword: string = '';

    constructor(private router: Router, private configService: AppConfig) {
        this.adminEmail = this.configService.getConfig('ADMIN_EMAIL');
        this.adminPassword = this.configService.getConfig('ADMIN_PASSWORD');
        this.superAdminEmail = this.configService.getConfig('SUPER_ADMIN_EMAIL');
        this.superAdminPassword = this.configService.getConfig('SUPER_ADMIN_PASSWORD');
        this.userEmail = this.configService.getConfig('USER_EMAIL');
        this.userPassword = this.configService.getConfig('USER_PASSWORD');
    }

    setToken(token: string): void {
        sessionStorage.setItem('protecto-auth-token', token);
    }

    getToken(): string | null {
        return sessionStorage.getItem('protecto-auth-token');
    }

    async isLoggedIn(): Promise<boolean> {
        if (this.getToken() !== null) {
            return true
        }
        else {
            this.router.navigate(['login']);
            return false
        }
    }

    loggedAccount(): any {
        let token: string = this.getToken() || ''
        return token ? JSON.parse(token) : { account: 'login' }
    }

    redirectToModule() {
        this.router.navigate([`${this.loggedAccount()?.account}`]);
    }

    logout() {
        sessionStorage.removeItem('protecto-auth-token');
        this.router.navigate(['login']);
    }

    prepareToken(account: string): string {
        return JSON.stringify({ timestamp: new Date().toJSON(), account: account })
    }

    login({ email, password }: any): Observable<any> {
        if (email === this.adminEmail && password === this.adminPassword) {
            this.setToken(this.prepareToken('admin'));
            return of({ account: 'admin', email });
        }
        else if (email === this.superAdminEmail && password === this.superAdminPassword) {
            this.setToken(this.prepareToken('super-admin'));
            return of({ account: 'super-admin', email });
        }
        else if (email === this.userEmail && password === this.userPassword) {
            this.setToken(this.prepareToken('user'));
            return of({ account: 'user', email });
        }
        return throwError(new Error('Failed to login'));
    }
}
