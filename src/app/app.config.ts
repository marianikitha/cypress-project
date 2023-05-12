import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { of } from 'rxjs';

@Injectable()
export class AppConfig {
    private config: any = null;
    constructor(private http: HttpClient) {}

    // Use to get the data found in the second file (config file)
    public getConfig(key: string): string {
        if (this.config) {
            return this.config[key];
        }
        return '';
    }

    public load() {
        return this.config = environment
        // const request: any = null;
        // const env = environment.environmentName;
        // let configFile = '';

        // if (env === '') {
        //     configFile = './assets/config/appsettings.json';
        // } else {
        //     configFile = './assets/config/appsettings.' + env + '.json';
        // }

        // return new Promise((resolve, reject) => {
        //     this.http.get(configFile).subscribe(
        //         async (responseData) => {
        //             this.config = responseData;
        //             resolve(true);
        //         },
        //         (error) => {
        //             console.log('Configuration file ' + configFile + ' could not be read');
        //             resolve(true);
        //         }
        //     );
        // });
    }
}
