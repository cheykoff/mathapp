import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassselectionComponent } from './components/classselection/classselection.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { ResultpageComponent } from './components/resultpage/resultpage.component';
import { CodepageComponent } from './components/codepage/codepage.component';
import { LoginComponent } from './components/login/login.component';
import { LevelpageComponent } from './components/levelpage/levelpage.component';

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
  { path: '**', redirectTo: '/startpage' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
