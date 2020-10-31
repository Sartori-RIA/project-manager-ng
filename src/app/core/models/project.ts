import {BaseModel} from './base-model';

export interface Project extends BaseModel {
  name: string;
  start_date: Date;
  end_date: Date;
  progress?: number;
  finished?: boolean;
}
