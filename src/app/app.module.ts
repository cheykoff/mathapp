import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  provideFirestore,
  getFirestore,
  serverTimestamp,
  FieldValue,
} from '@angular/fire/firestore';
import { MathjaxModule } from 'mathjax-angular';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { ClassselectionComponent } from './classselection/classselection.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { AppRoutingModule } from './app-routing.module';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { ChangeBgDirective } from './change-bg.directive';
import { HeaderComponent } from './header/header.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';

export interface ts {
  created: typeof serverTimestamp | FieldValue | Date;
}

@NgModule({
  declarations: [
    AppComponent,
    ClassselectionComponent,
    ExerciseComponent,
    ResultpageComponent,
    ChangeBgDirective,
    HeaderComponent,
    LoadingpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase, 'quizappv1')),
    provideFirestore(() => getFirestore()),
    MathjaxModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
