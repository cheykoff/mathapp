/*
TODO:
- routing: 
  - startpage/exercise is not found (Failed to load resource: the server responded with a status of 404 ()  - reload leads to menu
- https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig?key=AIzaSyC9VBHxz2xe5x2V5LJB87VpQVrtwSWioEI&cb=1663574536029 404 (Not Found) - chrome and edge
- reuse code
- check scopes in TypeScript
- use more types
- enable strict mode?
- consistent css styles
- use layout/core compenents (e.g. header)
- try routing for exercises and use services and resolvers
- add tests
- add comments
- store end date of session (leaving the page)
- enable prod mode
- define rules for firebase
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  declarations: [
    AppComponent,
    ClassselectionComponent,
    ExerciseComponent,
    ResultpageComponent,
    ChangeBgDirective,
    LoadingpageComponent,
    StartpageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
