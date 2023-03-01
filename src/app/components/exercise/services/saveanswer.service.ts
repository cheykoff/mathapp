import { Injectable } from '@angular/core';

import { Exercise } from 'src/app/components/exercise/exercise';
import { SharedService } from 'src/app/services/shared.service';
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
