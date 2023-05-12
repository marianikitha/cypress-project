import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class DataService {

    storedState: { [pageName: string]: any } = {};

    constructor() { }

    setStoredState(data: any) {
        if (data?.pageName) {
            this.storedState[data.pageName] = data;
        }
    }

    getStoredState(pageName: string) {
        if (Object.keys(this.storedState).length !== 0) {
            return this.storedState[pageName];
        } else {
            return null;
        }
    }

    clearStoredState() {
        if (Object.keys(this.storedState).length !== 0) {
            this.storedState = {};
        }
    }
}
