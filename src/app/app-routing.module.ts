import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { ClassselectionComponent } from './classselection/classselection.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { StartpageComponent } from './startpage/startpage.component';
import { OpenQuestionComponent } from './open-question/open-question.component';

const routes: Routes = [
  { path: '', redirectTo: '/startpage', pathMatch: 'full' },
  { path: 'loadingpage', component: LoadingpageComponent },
  {
    path: 'startpage',
    component: StartpageComponent,
  },
  {
    path: 'classselection',
    component: ClassselectionComponent,
  },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'open-question', component: OpenQuestionComponent },
  { path: 'resultpage', component: ResultpageComponent },
  { path: '**', redirectTo: '/startpage' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
