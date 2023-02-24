import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckanswerService {
  constructor() {}

  consoleLog() {
    console.log('checkanswer service called');
  }
}
