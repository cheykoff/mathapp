import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(public shared: SharedService, private _data: DataService) {}

  ngOnInit(): void {
    this._data.getStudentDocument(this.shared.getStudentId());
    this.shared.calculatePossibleStars();
    this.shared.calculateCollectedStars();
  }
}
