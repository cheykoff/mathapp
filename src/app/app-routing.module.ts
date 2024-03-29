import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';

import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { TopicsComponent } from './components/topics/topics.component';

import { ClassselectionComponent } from './components/classselection/classselection.component';
import { ChapterselectionComponent } from './components/chapterselection/chapterselection.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { ResultpageComponent } from './components/resultpage/resultpage.component';

import { LevelpageComponent } from './components/levelpage/levelpage.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  { path: '', redirectTo: '/website', pathMatch: 'full' },
  { path: 'website', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'topics', component: TopicsComponent },
  {
    path: 'classselection',
    component: ClassselectionComponent,
  },
  { path: 'chapterselection', component: ChapterselectionComponent },
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
