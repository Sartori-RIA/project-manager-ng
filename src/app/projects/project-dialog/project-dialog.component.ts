import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../core/models/project';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogResult} from '../../core/models/dialog-result';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    start_date: [null, [Validators.required]],
    end_date: [null, [Validators.required]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Project,
              public dialogRef: MatDialogRef<ProjectDialogComponent>,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form.patchValue({
      name: this.data?.name,
      start_date: this.data?.start_date,
      end_date: this.data?.end_date
    });
  }

  onDelete(): void {
    const result: DialogResult = {
      action: 'delete',
      project: this.mountData()
    };
    this.dialogRef.close(result);
  }

  onSave(): void {
    const result: DialogResult = {
      action: !!this.data ? 'update' : 'create',
      project: this.mountData()
    };
    this.dialogRef.close(result);
  }

  private mountData(): Project {
    const values = this.form.value;
    return {
      end_date: values.end_date,
      start_date: values.start_date,
      name: values.name,
      id: this.data?.id,
    };
  }
}

