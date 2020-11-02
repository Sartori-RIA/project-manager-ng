import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivityDialogParams, DialogResult} from '../../core/models/dialog-result';
import {Activity} from '../../core/models/activity';

@Component({
  selector: 'app-activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    start_date: [null],
    end_date: [null]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: ActivityDialogParams,
              public dialogRef: MatDialogRef<ActivityDialogComponent>,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDelete(): void {
    const result: DialogResult = {
      action: 'delete',
      activity: this.data.activity
    };
    this.dialogRef.close(result);
  }

  onSave(): void {
    const result: DialogResult = {
      action: !!this.data?.activity?.id ? 'update' : 'create',
      activity: this.mountData()
    };
    this.dialogRef.close(result);
  }

  private updateForm(): void {
    this.form.patchValue({
      name: this.data?.activity?.name,
      start_date: this.data?.activity?.start_date,
      end_date: this.data?.activity?.end_date,
    });
  }

  private mountData(): Activity {
    const values = this.form.value;
    return {
      end_date: values.end_date,
      finished: false,
      name: values.name,
      start_date: values.start_date,
      id: this.data?.activity?.id,
      project_id: this.data?.project_id
    };
  }
}


