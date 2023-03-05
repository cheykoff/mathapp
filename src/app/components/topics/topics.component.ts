import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { SharedService } from '../../services/shared.service';
import { GetTopicsService } from './get-topics.service';

import { Topic } from './topics';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topics$: Observable<Topic[]>;

  constructor(
    private _router: Router,
    public shared: SharedService,
    public getTopics: GetTopicsService
  ) {}

  ngOnInit(): void {
    this.topics$ = this.getTopics.getTopics();
  }

  goToLevelPage(topic: Topic) {
    this.shared.topic = topic.name;
    this._router.navigate(['/', 'levelpage']);
  }
}
