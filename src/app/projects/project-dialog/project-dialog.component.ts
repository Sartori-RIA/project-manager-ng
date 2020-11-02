import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Project} from '../../core/models/project';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form.patchValue({
      name: this.data?.name,
      start_date: this.data?.start_date,
      end_date: this.data?.end_date
    });
  }

}
