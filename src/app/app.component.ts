import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    this.shared.setSessionId();
    this.shared.setParameters();
    this.dataService.storeSessionId();
  }
}
