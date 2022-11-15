import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { ClassselectionComponent } from './classselection/classselection.component';
import { Exercise2Component } from './exercise2/exercise2.component';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { CodepageComponent } from './codepage/codepage.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'loadingpage', component: LoadingpageComponent },
  {
    path: 'classselection',
    component: ClassselectionComponent,
  },
  { path: 'codepage', component: CodepageComponent },
  { path: 'exercise2', component: Exercise2Component },
  { path: 'resultpage', component: ResultpageComponent },
  { path: '**', redirectTo: '/startpage' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
