import { Country } from '../../models/country';
import { State } from '../../models/state';
import { SourcePurpose } from '../../models/source-purpose';
import { SubjectType } from '../../models/subject-type';
import { DataDetails } from '../../models/data-details';
import { MetaData } from '../../models/metadata';
// import { AdUsers } from '../../models/ad-users';
// import { TreeData } from 'src/app/modules/core/models/tree-data';
import { Users } from '../../models/users';
import { TreeData } from '../../models/tree-data';
import { AdUsers } from '../../models/ad-users';

export interface ActionsDataCatalogState {
    tree: {
        data: TreeData[] | [],
        type: string
    };
    sourcePurposeList: SourcePurpose[] | [];
    subjectTypeList: SubjectType[] | [];
    countriesList: Country[] | [];
    euCountriesList: Country[] | [];
    statesList: State[] | [];
    dataDetails: DataDetails;
    metaData: MetaData;
    // usersWithAccess:{
    //     users:Users[]
    // }
    usersWithAccess:Users[];
    adUsers: AdUsers[] | [];
}
