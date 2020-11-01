import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Activity} from '../../core/models/activity';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.updateForm();
  }

  private updateForm(): void {
    this.form.patchValue({
      name: this.data?.activity?.name,
      start_date: this.data?.activity?.start_date,
      end_date: this.data?.activity?.end_date,
    });
  }

}

export interface ActivityDialogParams {
  activity?: Activity;
  project_id: number;
}
