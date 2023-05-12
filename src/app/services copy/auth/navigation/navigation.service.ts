import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class NavigationService {

    private history: string[] = [];
    isPopState: any = null;

    constructor(private router: Router, private location: Location) {}

    public startSaveHistory(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.history.push(event.urlAfterRedirects);
            }
        });
    }

    public savePiiIdentification(): void {
        this.history.push('/pii-identification');
    }

    public getHistory(): string[] {
        return this.history;
    }

    public goBack(): void {
        this.history.pop();

        if (this.history.length > 0) {
            this.location.back();
        } else {
            this.router.navigateByUrl('/');
        }
    }

    public getPreviousUrl(): string {
        if (this.history.length > 0) {
            return this.history[this.history.length - 2];
        }

        return '';
    }

    // public setEventHistory(event: Event) {
    //     if (event instanceof NavigationStart) {
    //         if (event.restoredState && event.navigationTrigger === 'popstate') {
    //             this.isPopState = true;
    //         } else if (event.navigationTrigger === 'imperative') {
    //             this.isPopState = false;
    //         }
    //     }
    //     return this.isPopState;
    // }

    public onPopState = () => {
        return this.isPopState;
    };
}
