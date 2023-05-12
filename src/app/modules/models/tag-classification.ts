import { Tag } from './tag';

export interface TagClassification {
    name: string;
    combination: Combination[];
}

export interface Combination {
    id: string;
    tags: Tag[];
}

export interface Category {
    name: string;
    combination: Combination;
}
