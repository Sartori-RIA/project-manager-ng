import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  startDate = moment();
  endDate = moment();

  constructor() {
  }

  ngOnInit(): void {
  }

}
