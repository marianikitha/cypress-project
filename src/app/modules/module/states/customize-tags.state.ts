import { TagClassification } from 'src/app/modules/models/tag-classification';
import { Tag } from 'src/app/modules/models/tag';
export interface CustomizeTagsClassificationState {
    categoryList: TagClassification[];
    tagList: Tag[];
}
