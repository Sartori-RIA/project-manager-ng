import {Activity} from './activity';
import {Project} from './project';

export type DialogResultAction = 'create' | 'update' | 'delete';

export interface ActivityDialogParams {
  activity?: Activity;
  project_id: number;
}

export interface DialogResult {
  action: DialogResultAction;
  project?: Project;
  activity?: Activity;
}
