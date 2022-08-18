import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private shared: SharedService) {}

  urlParameters = {};

  storeUrlParameters(parameters) {
    console.log('storeUrlParameters', parameters);
    this.urlParameters = parameters;
    this.http
      .post(
        'https://quizapp-d018b-default-rtdb.europe-west1.firebasedatabase.app/parameters.json',
        {
          parameters,
          startTime: Date.now(),
          url: window.location.href,
        }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  storeResult(points) {
    const schoolClass = this.shared.getSchoolClass();
    const parameters = this.urlParameters;

    this.http
      .post(
        'https://quizapp-d018b-default-rtdb.europe-west1.firebasedatabase.app/result.json',
        {
          points,
          schoolClass,
          endTime: Date.now(),
          url: window.location.href,
          parameters,
        }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
