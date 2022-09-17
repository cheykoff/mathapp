import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css'],
})
export class StartpageComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  setMode() {
    this.dataService.storeMode(); // TODO: Pass value to service
  }
}
