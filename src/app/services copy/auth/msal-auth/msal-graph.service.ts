import * as graph from '@microsoft/microsoft-graph-client';

function getAuthenticatedClient(accessToken: any) {
    // Initialize Graph client
    const client = graph.Client.init({
        // Use the provided access token to authenticate
        // requests
        authProvider: (done: any) => {
            done(null, accessToken);
        }
    });

    return client;
}

export async function getUserDetails(accessToken: any) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/me').select('displayName,mail,userPrincipalName').get();

    return user;
}

export async function getListOfAdUsers(accessToken: any) {
    const client = getAuthenticatedClient(accessToken);

    const users = await client.api('/users').select('userPrincipalName').get();

    return users;
}

export async function getUserGroups(accessToken: any) {
    const client = getAuthenticatedClient(accessToken);

    let groups = await client.api('/me/memberOf').select('displayName').get();

    if (groups && groups?.value && groups?.value?.length) {
        groups = groups.value.map((g: any) => {
            if (g?.displayName) {
                return g?.displayName?.toLowerCase();
            } else {
                return '';
            }
        });
    } else {
        groups = [];
    }
    return groups;
}

export async function getListOfUsers(accessToken: any) {
    const client = getAuthenticatedClient(accessToken);

    let users = await client.api('/users').select('userPrincipalName').get();

    if (users && users?.value && users?.value?.length) {
        users = users?.value?.map((user: any) => {
            if (user) {
                return user;
            } else {
                return '';
            }
        });
    } else {
        users = [];
    }
    return users;
}
