import { Retention } from './retention';
import { SourcePurpose } from 'src/app/modules/models/source-purpose';
import { SubjectType } from './subject-type';
import { DataLocation } from './location';

export interface MetaData {
    datasourcePath: string[];
    sourcePurpose: SourcePurpose[];
    location: DataLocation[];
    retention: Retention;
    subjectType: SubjectType[];
    hasMinorData: boolean | null;
}
