import {BaseModel} from './base-model';

export interface Activity extends BaseModel {
  name: string;
  start_date: Date;
  end_date: Date;
  finished: boolean;
  project_id?: number;
}
