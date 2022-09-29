/*
TODO:
Errors in console:
- https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel?database=projects%2Fquizapp-d018b%2Fdatabases%2F(default)&gsessionid=TuHjipmSfJyWvDehGrXsvs5h3HdIxauC&VER=8&RID=rpc&SID=bJsRXBw2A0uOriyD1oNEFw&CI=0&AID=4&TYPE=xmlhttp&zx=itfzzw3atasw&t=1 400
 routing: 
- startpage/exercise is not found (Failed to load resource: the server responded with a status of 404 ()  - reload leads to menu
- https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig?key=AIzaSyC9VBHxz2xe5x2V5LJB87VpQVrtwSWioEI&cb=1663574536029 404 (Not Found) - chrome and edge

Refactoring
- reuse code
- check all <any> data types
- enable strict mode?
- consistent css styles
- use layout/core compenents (e.g. header)
- try routing for exercises and use services and resolvers
- refreshing on exersice page should keep the user on the same exercise
- add tests
- add comments
- store end date of session (leaving the page)
- enable prod mode
- define rules for firebase
- store time per exercise 

*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { Firestore } from '@angular/fire/compat/firestore';
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
