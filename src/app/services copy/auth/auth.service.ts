import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import createAuth0Client from '@auth0/auth0-spa-js';
import { PublicClientApplication } from '@azure/msal-browser';

import { AdConfiguration } from '../../modules/models/ad-configuration';
import { ApiResponse } from '../../modules/models/api-response';
import { getListOfAdUsers, getUserDetails, getUserGroups } from './msal-auth/msal-graph.service';
import { USERGROUPS, USERROLE } from 'src/app/app.constant';

@Injectable({
    providedIn: 'root'
})

export class AuthorizationService {

    constructor(private http: HttpClient, private router: Router) { }

    auth0ClientInstance: any;

    getAdConfiguration(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>('/adconfiguration');
    }

    saveAdConfiguration(adConfiguration: AdConfiguration): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('/adconfiguration', {
            data: adConfiguration
        });
    }

    deleteAdConfiguration(): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>('/adconfiguration');
    }

    saveNotificationEmail(emailConfiguration: {
        notificationEmail: string;
        password: string;
    }): Observable<ApiResponse> {
        return this.http.put<ApiResponse>('/customize/email', {
            data: emailConfiguration
        });
    }

    async msalLogin(
        fetchAdConfiguration: boolean,
        adconfig?: AdConfiguration
    ): Promise<{ msalInstance?: any; loginResponse: boolean; config?: any }> {
        let adConfiguration!: AdConfiguration;
        // Fetch Ad configuration from api
        if (fetchAdConfiguration) {
            let adConfigResponse: ApiResponse = await this.http.get<ApiResponse>('/adconfiguration').toPromise();

            if (
                adConfigResponse.success &&
                adConfigResponse.data &&
                adConfigResponse.data.clientId &&
                adConfigResponse.data.tenantId
            ) {
                adConfiguration = adConfigResponse.data;
            } else {
                if (!adConfigResponse.success) {
                    this.router.navigate(['/signup']);
                }
                return { loginResponse: false };
            }
        } else {
            // Ad configuration from parameter
            if (adconfig) {
                adConfiguration = adconfig;
            } else {
                // No adconfiguration provided
                return { loginResponse: false };
            }
        }

        let config: any = this.initializeMsalConfig(adConfiguration?.authProvider?.clientId, adConfiguration?.authProvider?.tenantId);

        let msalInstance = new PublicClientApplication(config.msalConfig);
        try {
            await msalInstance.loginPopup({
                scopes: config.msalConfig.scopes,
                prompt: 'login'
            });
        } catch (error) {
            return { loginResponse: false };
        }

        return { msalInstance, loginResponse: true, config };
    }

    public initializeMsalConfig = (clientIdValue: string, tenantIdValue: string | undefined) => {
        return {
            msalConfig: {
                auth: {
                    clientId: clientIdValue,
                    redirectUri: window.location.origin,
                    authority: `https://login.microsoftonline.com/${tenantIdValue}`,
                    scopes: ['user.read', 'Group.Read.All', 'User.Read.All'],
                    validateAuthority: true
                },
                cache: {
                    cacheLocation: 'sessionStorage',
                    storeAuthStateInCookie: false
                }
            },
            adGroupsConfig: {
                adminGroup: USERGROUPS.ADMIN,
                userGroup: USERGROUPS.USER,
                superAdminGroup: USERGROUPS.SUPER_ADMIN
            }
        };
    };

    public getUserProfile = async (clientId: string, tenantId: string) => {
        try {
            let config: any = this.initializeMsalConfig(clientId, tenantId);
            let msalInstance = new PublicClientApplication(config.msalConfig);
            const accessToken = await this.getAccessToken(config.msalConfig.auth.scopes, msalInstance);
            if (accessToken) {
                // Get the user's profile from Graph
                const user = await getUserDetails(accessToken);
                return user;
            }
        } catch (err) {
            console.log('Error in getting UserProfile:', err);
            return;
        }
    };

    private getAccessToken = async (scopes: any, msalInstance: any) => {
        try {
            // check for existing access token and return it

            const accounts = await msalInstance.getAllAccounts();

            if (!Object.keys(accounts).length || accounts.length <= 0) throw new Error('login_required');
            // Get the access token silently
            // If the cache contains a non-expired token, this function
            // will just return the cached token. Otherwise, it will
            // make a request to the Azure OAuth endpoint to get a token
            const silentResult = await msalInstance.acquireTokenSilent({
                scopes: scopes,
                account: accounts,
                forceRefresh: true
            });

            sessionStorage.setItem('accesstoken', silentResult.accessToken);
            sessionStorage.setItem('idtoken', silentResult.idToken);
            return silentResult.accessToken;
        } catch (err) {
            console.log('Error acquiring access tokens', err);
        }
    };

    public getGroupsForLoggedInUser = async (msalInstance: any, config: any) => {
        // Msal User Groups
        try {
            const accessToken = await this.getAccessToken(config.msalConfig.auth.scopes, msalInstance);

            if (accessToken) {
                // Get the user's groups from Graph
                const groups = await getUserGroups(accessToken);

                return groups;
            } else {
                return [];
            }
        } catch (err) {
            console.log('Error in getting UserProfile:', err);
            return [];
        }
    };

    public identifyUserRole = (routeUserRole: string, groups: [string], config: any): string => {
        let userRole = 'none';
        if (groups.length > 0) {
            if (!routeUserRole) {
                routeUserRole = 'admin'
            }
            if (routeUserRole === 'admin' &&
                groups.includes(
                    config.adGroupsConfig.adminGroup ? config?.adGroupsConfig?.adminGroup?.toLowerCase() : ''
                )
            ) {
                userRole = 'admin';
            } else if (routeUserRole === 'user' &&
                groups.includes(config.adGroupsConfig.userGroup ? config?.adGroupsConfig?.userGroup?.toLowerCase() : '')
            ) {
                userRole = 'user';
            } else if (routeUserRole === 'superadmin' &&
                groups.includes(
                    config.adGroupsConfig.superAdminGroup ? config?.adGroupsConfig?.superAdminGroup?.toLowerCase() : ''
                )
            ) {
                userRole = 'superadmin';
            }
        } else {
            userRole = 'none';
        }
        return userRole;
    };

    public identifyRouteRoleToFindUserRole = () => {
        return
    }

    public storeAuth0Tokens = async (accessToken: string) => {
        try {
            sessionStorage.setItem('accesstoken', accessToken);
        } catch (error) {
            console.log("Error while storing access token", error)
        }
    }

    public identifyAuth0UserRole = async (): Promise<string[]> => {
        let userRoles: string[] = []
        try {
            let userRoleResponse: ApiResponse = await this.http.get<ApiResponse>('/auth0/user-roles').toPromise();
            if (userRoleResponse.success &&
                userRoleResponse.data) {
                userRoles = userRoleResponse?.data?.roles
            }
        }
        catch (error) {
            console.log('Error in identifying user role:', error);
        }
        return userRoles;

    };

    public getAdUsersList = async (clientId: string, tenantId: string) => {
        try {
            let config: any = await this.initializeMsalConfig(clientId, tenantId)
            let msalInstance = await this.getMsalInstance(clientId, tenantId)
            const accessToken = await this.getAccessToken(config.msalConfig.auth.scopes, msalInstance);

            if (accessToken) {
                const users = await getListOfAdUsers(accessToken);

                return users;
            }
        } catch (err) {
            console.log('Error in getting User List:', err);
            return;
        }
    };

    public getMsalInstance = (clientId: string, tenantId: string | undefined) => {
        let config: any = this.initializeMsalConfig(clientId, tenantId);

        let msalInstance = new PublicClientApplication(config.msalConfig);

        return msalInstance;
    };

    public authGuard = async (routeUserRole: string): Promise<boolean> => {
        let adConfigResponse: ApiResponse = await this.http.get<ApiResponse>('/adconfiguration').toPromise();
        if (adConfigResponse.success &&
            adConfigResponse.data) {
            if (adConfigResponse?.data?.authProvider?.name == 'microsoft') {
                return this.msalAuthGuard(routeUserRole, adConfigResponse);
            }
            else if (adConfigResponse?.data?.authProvider?.name == 'auth0') {
                return this.auth0AuthGuard(routeUserRole, adConfigResponse);
            }
            else {
                console.error("Invalid Auth Provider");
                return false
            }
        }
        else {
            console.error("Failed to load adconfiguration");
            return false
        }

    };

    public getAuth0Instance = async (clientId: string, domain: string, audience: string) => {
        this.auth0ClientInstance = await createAuth0Client({ client_id: clientId, domain: domain, audience: audience })
        // return this.auth0ClientInstance;
    }

    public getAuth0UserProfile = async () => {
        try {
            let username: string = '';
            let result = await this.auth0ClientInstance.getUser().then((user: any) => {
                username = user?.name
                return username
            });
            return result
        }
        catch (error) {
            console.log('Error while getting user profile', error);

        }

    }

    public auth0AuthGuard = async (routeUserRole: string, adConfigResponse: ApiResponse): Promise<boolean> => {
        if (
            adConfigResponse?.data?.authProvider?.clientId &&
            adConfigResponse?.data?.authProvider?.domain &&
            adConfigResponse?.data?.authProvider?.audience
        ) {

            // Creating Auth0 Instance
            await this.getAuth0Instance(adConfigResponse?.data?.authProvider?.clientId, adConfigResponse?.data?.authProvider?.domain, adConfigResponse?.data?.authProvider?.audience);

            // User not loggedIn Scenario
            let isAuthenticated = await this.auth0ClientInstance.isAuthenticated()
            if (!isAuthenticated) {
                this.router.navigate(['/login']);
                return false;
            }

            // // Identifying user role
            const userRoles = await this.identifyAuth0UserRole()

            // Refresh auth0 token
            setInterval(async () => {
                let accessToken = await this.auth0ClientInstance.getTokenSilently();
                await this.storeAuth0Tokens(accessToken)
            }, 1000 * 58 * 57);

            return userRoles.includes(routeUserRole) ? true : false
        }
        else {
            return false
        }
    }

    public msalAuthGuard = async (routeUserRole: string, adConfigResponse: ApiResponse): Promise<boolean> => {
        let adConfiguration!: AdConfiguration;
        if (
            adConfigResponse?.data?.authProvider?.clientId &&
            adConfigResponse?.data?.authProvider?.tenantId
        ) {
            adConfiguration = adConfigResponse.data;

            let config: any = this.initializeMsalConfig(adConfiguration?.authProvider?.clientId, adConfiguration?.authProvider?.tenantId);

            let msalInstance = new PublicClientApplication(config.msalConfig);

            // User not loggedIn Scenario
            const accounts: any = msalInstance.getAllAccounts();
            if (!Object.keys(accounts).length || accounts.length <= 0) {
                this.router.navigate(['/login']);
                return false;
            }
            const loggedInUserGroups = await this.getGroupsForLoggedInUser(msalInstance, config);
            const userRole = await this.identifyUserRole(routeUserRole, loggedInUserGroups, config);
            await this.refreshMicrosoftAccessToken(msalInstance, config);
            return userRole === routeUserRole ? true : false;
        } else {
            return false;
        }
    };

    public refreshMicrosoftAccessToken = async (msalInstance: any, config: any) => {
        setInterval(async () => {
            await this.getAccessToken(config.msalConfig.auth.scopes, msalInstance);
        }, 1000 * 58 * 57);
    };

    public redirectToAuthorizedPage = async () => {
        let routeUserRole = "admin"
        let adConfiguration!: AdConfiguration;
        let adConfigResponse: ApiResponse = await this.http.get<ApiResponse>('/adconfiguration').toPromise();

        if (
            adConfigResponse.success &&
            adConfigResponse.data &&
            adConfigResponse.data.clientId &&
            adConfigResponse.data.tenantId
        ) {
            adConfiguration = adConfigResponse.data;
            let config: any = this.initializeMsalConfig(adConfiguration?.authProvider?.clientId, adConfiguration?.authProvider?.tenantId);

            let msalInstance = new PublicClientApplication(config.msalConfig);

            // User not loggedIn Scenario
            const accounts: any = msalInstance.getAllAccounts();
            if (!Object.keys(accounts).length || accounts.length <= 0) {
                this.router.navigate(['/login']);
            }
            const loggedInUserGroups = await this.getGroupsForLoggedInUser(msalInstance, config);
            const userRole = await this.identifyUserRole(routeUserRole, loggedInUserGroups, config);

            if (userRole === USERROLE.ADMIN) {
                if (this.router.url !== '/login') {
                    this.router.navigate([this.router.url]);
                } else {
                    this.router.navigate(['/admin']);
                }
            } else if (userRole === USERROLE.USER) {
                if (this.router.url !== '/login') {
                    this.router.navigate([this.router.url]);
                } else {
                    this.router.navigate(['/user']);
                }
            } else if (userRole === USERROLE.SUPER_ADMIN) {
                if (this.router.url !== '/login') {
                    this.router.navigate([this.router.url]);
                } else {
                    this.router.navigate(['/super-admin']);
                }
            } else {
                this.router.navigate(['/user']);
            }
        } else {
            this.router.navigate(['/signup']);
        }
    };
}
