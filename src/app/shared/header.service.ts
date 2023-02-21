import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  title$: BehaviorSubject<string> = new BehaviorSubject<string>('DieMatheApp');
  constructor() {}

  setTitle(title: string) {
    this.title$.next(title);
  }
}
