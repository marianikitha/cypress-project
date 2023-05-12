export interface Users {
    name: string;
    lastUsedDate: string;
    columns: {
        name: string;
        tag: string[];
    }[]
}
