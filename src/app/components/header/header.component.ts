import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from 'src/app/shared/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title$: Observable<string> = this._header.title$;
  constructor(private _header: HeaderService) {}

  ngOnInit(): void {}
}
