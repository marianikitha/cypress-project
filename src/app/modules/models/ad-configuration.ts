export interface AdConfiguration {
    adminGroupName?: string;
    userGroupName?: string;
    authProvider:{
        domain?: string;
        audience?: string;
        clientId: string;
        tenantId?: string;
        name:string;
    }
    notificationEmail: string;
}
