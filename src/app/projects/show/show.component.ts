import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Project} from '../../core/models/project';
import {ProjectDialogComponent} from '../project-dialog/project-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ProjectsService} from '../../core/services/projects.service';
import {DialogResult} from '../../core/models/dialog-result';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

    project$: Observable<Project> = this.activatedRoute.data.pipe(map((data) => data.project));
    project: Project;

    constructor(private activatedRoute: ActivatedRoute,
                private projectService: ProjectsService,
                private cdRefs: ChangeDetectorRef,
                private router: Router,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.setProjectData();
    }

    openEditDialog(): void {
        const refs$ = this.dialog.open(ProjectDialogComponent, {
            data: this.project,
            minWidth: '33vh'
        });
        refs$.afterClosed().pipe(take(1)).subscribe((params: DialogResult) => {
            this.projectService.update(params.project)
                .pipe(take(1))
                .subscribe((res) => this.project = res);
        });
    }

    removeProject(): void {
        this.projectService.delete(this.project.id)
            .pipe(take(1))
            .subscribe(() => this.router.navigateByUrl('/'));
    }

    loadProject(): void {
        this.projectService.show(this.activatedRoute.snapshot.params.id)
            .pipe(take(1))
            .subscribe((project) => {
                console.log('batman', project);
                this.project = project;
                this.cdRefs.detectChanges();
            });
    }

    private setProjectData(): void {
        this.project$.pipe(take(1)).subscribe((project) => {
            this.project = project;
            this.cdRefs.detectChanges();
        });
    }
}
