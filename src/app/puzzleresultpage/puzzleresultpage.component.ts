import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzleresultpage',
  templateUrl: './puzzleresultpage.component.html',
  styleUrls: ['./puzzleresultpage.component.css'],
})
export class PuzzleresultpageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getStars(): string {
    let imgUrl = 'assets/img/5stars.gif';
    return imgUrl;
  }
}
