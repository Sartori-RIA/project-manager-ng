import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {

  @Output() onFabClick = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
