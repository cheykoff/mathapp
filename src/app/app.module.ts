/*
Refactoring
- break ExerciseComponent into smaller components
- reuse code
- enable strict mode?
- consistent css styles (use scss)
- use layout/core compenents (e.g. header)
- try routing for exercises and use services and resolvers
- refreshing on exercise page should keep the user on the same exercise
- add tests
- add comments
- store end date of session (leaving the page)
- enable prod mode
- define rules for firebase
*/

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
import { PuzzleComponent } from './puzzle/puzzle.component';
import { LoginComponent } from './login/login.component';

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
    PuzzleComponent,
    LoginComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
