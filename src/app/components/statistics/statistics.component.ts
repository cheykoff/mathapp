import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../services/shared.service';
import { GetStudentDataService } from 'src/app/services/get-student-data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(
    public shared: SharedService,
    private _getStudentData: GetStudentDataService
  ) {}

  ngOnInit(): void {
    this._getStudentData.getStudentDocument(this.shared.getStudentId());
    this.shared.calculatePossibleStars();
    this.shared.calculateCollectedStars();
  }
}
