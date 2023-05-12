export interface TreeData {
    pageNumber: number;
    name: string;
    parent: string;
    datasourcePath: string[];
    children: TreeData[];
    dataassetId?: string | null;
}

export interface LoadMore {
    datasourcePath: string[];
    name: string;
    pageSize: number;
    pageNumber: number;
    dataassetId?: string | null;
}  
