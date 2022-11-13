import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { ClassselectionComponent } from './classselection/classselection.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { Exercise2Component } from './exercise2/exercise2.component';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { StartpageComponent } from './startpage/startpage.component';
import { CodepageComponent } from './codepage/codepage.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { LoginComponent } from './login/login.component';
import { FractionComponent } from './fraction/fraction.component';

const routes: Routes = [
  { path: '', redirectTo: '/exercise2', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'loadingpage', component: LoadingpageComponent },
  {
    path: 'startpage',
    component: StartpageComponent,
  },
  {
    path: 'classselection',
    component: ClassselectionComponent,
  },
  { path: 'codepage', component: CodepageComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'exercise2', component: Exercise2Component },
  { path: 'resultpage', component: ResultpageComponent },
  { path: 'puzzle', component: PuzzleComponent },
  { path: 'fraction', component: FractionComponent },
  { path: '**', redirectTo: '/startpage' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
