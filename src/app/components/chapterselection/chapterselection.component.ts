import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../service/data.service';
import { SharedService } from '../../shared/shared.service';
import { Chapter, chapters } from './chapters';

@Component({
  selector: 'app-chapterselection',
  templateUrl: './chapterselection.component.html',
  styleUrls: ['./chapterselection.component.scss'],
})
export class ChapterselectionComponent implements OnInit {
  chapters: Chapter[] = chapters;

  constructor(
    private _shared: SharedService,
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this.chapters = this.chapters.filter(
      (chapter) => chapter.classLevel === this._shared.getSchoolClass()
    );
  }

  selectChapter(chapter: Chapter): void {
    this._dataService.storeChapter(chapter);
    this._shared.setChapter(chapter.chapterNumber);
    this._router.navigate(['/', 'exercise']);
  }
}
