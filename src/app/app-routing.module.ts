import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WebsiteComponent } from './website/website.component';

import { StartComponent } from './components/start/start.component';
import { DemoComponent } from './components/demo/demo.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TrainingComponent } from './components/training/training.component';
import { TrainingSetupComponent } from './components/training-setup/training-setup.component';

import { ClassselectionComponent } from './components/classselection/classselection.component';
import { Classselection2Component } from './components/classselection2/classselection2.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { ResultpageComponent } from './components/resultpage/resultpage.component';
import { CodepageComponent } from './components/codepage/codepage.component';

import { LevelpageComponent } from './components/levelpage/levelpage.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  { path: '', redirectTo: '/website', pathMatch: 'full' },
  { path: 'website', component: WebsiteComponent },
  { path: 'start', component: StartComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz-intro', component: QuizIntroComponent },
  { path: 'topics', component: TopicsComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'training-setup', component: TrainingSetupComponent },

  {
    path: 'classselection',
    component: ClassselectionComponent,
  },
  { path: 'classselection2', component: Classselection2Component },
  { path: 'codepage', component: CodepageComponent },
  { path: 'levelpage', component: LevelpageComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'resultpage', component: ResultpageComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: '/start' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
