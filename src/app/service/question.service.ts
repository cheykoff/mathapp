import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestionJson(schoolClass: number) {
    console.log('getQuestionJson, number' + schoolClass);
    console.log(this.http.get<any>(`assets/questions${schoolClass}.json`));
    return this.http.get<any>(`assets/questions${schoolClass}.json`);
    // return this.http.get<any>(`assets/questions5.json`);
  }
}
