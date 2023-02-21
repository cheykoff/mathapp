import { Component, OnInit } from '@angular/core';

import { HeaderService } from 'src/app/shared/header.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css'],
})
export class WebsiteComponent implements OnInit {
  constructor(private _header: HeaderService) {}

  ngOnInit(): void {
    this._header.setTitle('DieMatheApp');
  }
}
