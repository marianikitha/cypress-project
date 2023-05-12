import { LabelProps } from "./data-filter";

export interface DataDetails {
    isValid: boolean;
    disableColumDetails: boolean,
    datasourcePath: string[];
    type: string;
    category: LabelProps[];
    tags: string[];
    dataOwner: string[];
    recentOwners: string[];
    dataassetDelimiter: string;
}
