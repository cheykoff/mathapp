import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassselectionComponent } from './classselection/classselection.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { CodepageComponent } from './codepage/codepage.component';
import { LoginComponent } from './login/login.component';
import { LevelpageComponent } from './levelpage/levelpage.component';
import { DynamicExerciseComponent } from './dynamic-exercise/dynamic-exercise.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'classselection',
    component: ClassselectionComponent,
  },
  { path: 'codepage', component: CodepageComponent },
  { path: 'levelpage', component: LevelpageComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'resultpage', component: ResultpageComponent },
  { path: 'dynamic-exercise', component: DynamicExerciseComponent },
  { path: '**', redirectTo: '/startpage' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
