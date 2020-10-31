import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../core/services/projects.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  projects$ = this.projectService.index();

  constructor(private projectService: ProjectsService) {
  }

  ngOnInit(): void {
  }

}
