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

  ngOnInit(): void {}

  goToLevelPage(topic: Topic) {
    console.log('goToLevelPage for ' + topic.name);
    this.shared.topic = topic.name;
    this._router.navigate(['/', 'levelpage']);
  }
}
