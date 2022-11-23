import { Component, OnInit } from '@angular/core';

import { Topic } from '../../shared/topic';

import { topicListItems } from './topiclist';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  header = 'Übungsaufgaben';
  topics: Topic[] = topicListItems;

  constructor() {}

  ngOnInit(): void {}
}
