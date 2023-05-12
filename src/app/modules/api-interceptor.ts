import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { AppConfig } from 'src/app/app.config';

export class ApiInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // .json calls
        if (req.url.endsWith('.json')) {
            return next.handle(req);
        } else {
            // All api call's except .json requests
            // const baseUrl = this.configService.getConfig("BACKEND_API_URL");
            // const baseUrl = this.configService.getConfig('BACKEND_API_URL');

            // Append Access Token to all requests
            // const accessToken = sessionStorage.getItem('accesstoken') || '';
            // const idToken = sessionStorage.getItem('idtoken') || '';
 const baseUrl='http://localhost:3000/'

            let apiRequest = req.clone({
                url: `${baseUrl}${req.url}`,
                // setHeaders: {
                //     Authorization: `Bearer ${accessToken}`,
                //     idToken: idToken,
                // }
            });

            // const byPassLogin = this.configService.getConfig('BY_PASS_LOGIN');

            // if (byPassLogin) {
            //     apiRequest = req.clone({
            //         url: `${baseUrl}${req.url}`,
            //         setHeaders: {
            //             Authorization: `Bearer ${accessToken}`,
            //             idToken: idToken,
            //             "sampledataauthorization": "true",
            //         }
            //     });
            // }
            return next.handle(apiRequest);
        }
    }
}
