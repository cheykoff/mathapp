import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { MathjaxModule } from 'mathjax-angular';

import { AppComponent } from './app.component';
import { ClassselectionComponent } from './classselection/classselection.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { AppRoutingModule } from './app-routing.module';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { ChangeBgDirective } from './change-bg.directive';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { StartpageComponent } from './startpage/startpage.component';
import { CodepageComponent } from './codepage/codepage.component';

import { CountDownPipe } from './countdown.pipe';
import { EquationPipe } from './mathequation.pipe';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { LoginComponent } from './login/login.component';
import { FractionComponent } from './fraction/fraction.component';
import { Exercise2Component } from './exercise2/exercise2.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassselectionComponent,
    ExerciseComponent,
    ResultpageComponent,
    ChangeBgDirective,
    LoadingpageComponent,
    StartpageComponent,
    CodepageComponent,
    CountDownPipe,
    EquationPipe,
    PuzzleComponent,
    LoginComponent,
    FractionComponent,
    Exercise2Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase, 'quizappv1')),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule,
    MathjaxModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
