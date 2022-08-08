import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { ClassselectionComponent } from './classselection/classselection.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ResultpageComponent } from './resultpage/resultpage.component';

const routes: Routes = [
  { path: '', redirectTo: '/loadingpage', pathMatch: 'full' },
  { path: 'loadingpage', component: LoadingpageComponent },
  { path: 'classselection', component: ClassselectionComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'resultpage', component: ResultpageComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
