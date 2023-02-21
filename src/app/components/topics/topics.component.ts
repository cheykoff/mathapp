import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../../shared/shared.service';
import { HeaderService } from 'src/app/shared/header.service';

import { Topic, topics } from './topics';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topics: Topic[] = topics;

  constructor(
    private _router: Router,
    public shared: SharedService,
    private _header: HeaderService
  ) {}

  ngOnInit(): void {
    this._header.setTitle('Themen');
    if (
      this.shared.studentData.levelStars === undefined ||
      this.shared.studentData.levelStars === null
    ) {
      this.shared.initializeLevelStars();
    } else {
      this.shared.initializeLevelStarsPerTopic();
    }
    this.shared.setCurrentLevels();
  }

  goToLevelPage(topic: Topic) {
    this.shared.topic = topic.name;
    this._router.navigate(['/', 'levelpage']);
  }
}
