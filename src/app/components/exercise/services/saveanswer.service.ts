import { Injectable } from '@angular/core';

import { Exercise } from 'src/app/shared/exercise';
import { SharedService } from 'src/app/shared/shared.service';
import { ExerciseRecord } from '../exerciserecord';

@Injectable({
  providedIn: 'root',
})
export class SaveanswerService {
  constructor(shared: SharedService) {}

  saveAnswer(exerciseRecord: ExerciseRecord): void {
    return;
  }
}
