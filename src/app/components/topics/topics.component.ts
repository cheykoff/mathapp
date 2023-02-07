import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from '../../shared/shared.service';

import { Topic, topics } from './topics';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topics: Topic[] = topics;

  constructor(private _router: Router, public shared: SharedService) {}

  ngOnInit(): void {
    console.log('levelpage ngOnInit()');
    console.log('studentData.levelStars before');
    console.log(this.shared.studentData.levelStars);
    console.log('testObject before');
    console.log(this.shared.testObject);

    if (
      this.shared.studentData.levelStars === undefined ||
      this.shared.studentData.levelStars === null
    ) {
      console.log('studentData.levelStars is undefined or null');
      this.shared.initializeLevelStars();
    } else {
      console.log('studentData.levelStars is defined');
      this.shared.initializeLevelStarsPerTopic();
    }

    console.log('topics: studentData.levelStars after');
    console.log(this.shared.studentData.levelStars);
    console.log('topics: currentLevels before');
    console.log(this.shared.currentLevel);
    this.shared.setCurrentLevels();
    console.log('topics: currentLevels after');
    console.log(this.shared.studentData.levelStars);
  }

  goToLevelPage(topic: Topic) {
    this.shared.topic = topic.name;
    this._router.navigate(['/', 'levelpage']);
  }
}
