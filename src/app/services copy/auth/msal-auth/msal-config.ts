export const initializeMsalConfig = async (
    clientIdValue: string,
    tenantIdValue: string,
    adminGroupName: string,
    userGroupName: string,
    superAdminGroupName: string
) => {
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
            adminGroup: adminGroupName,
            userGroup: userGroupName,
            superAdminGroup: superAdminGroupName
        }
    };
};
