import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
registerLocaleData(localeDe, localeDeExtra);

// import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/compat/auth';
import {
  AngularFirestoreModule,
  USE_EMULATOR as USE_FIRESTORE_EMULATOR,
} from '@angular/fire/compat/firestore';
import {
  AngularFireFunctionsModule,
  USE_EMULATOR as USE_FUNCTIONS_EMULATOR,
} from '@angular/fire/compat/functions';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat'; // TODO: Remove compat
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // I might need this later
import { RouterModule } from '@angular/router';
import { MathjaxModule } from 'mathjax-angular';

import { AppComponent } from './app.component';
import { ClassselectionComponent } from './components/classselection/classselection.component';
import { AppRoutingModule } from './app-routing.module';
import { ResultpageComponent } from './components/resultpage/resultpage.component';
import { ChangeBgDirective } from './change-bg.directive';
import { CodepageComponent } from './components/codepage/codepage.component';

import { CountDownPipe } from './countdown.pipe';
import { EquationPipe } from './mathequation.pipe';
import { LoginComponent } from './components/login/login.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { LevelpageComponent } from './components/levelpage/levelpage.component';
import { StartComponent } from './components/start/start.component';
import { MenuComponent } from './components/menu/menu.component';
import { DemoComponent } from './components/demo/demo.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { TrainingComponent } from './components/training/training.component';
import { TrainingSetupComponent } from './components/training-setup/training-setup.component';
import { WebsiteComponent } from './website/website.component';
import { TopicsComponent } from './components/topics/topics.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassselectionComponent,
    ResultpageComponent,
    ChangeBgDirective,
    CodepageComponent,
    CountDownPipe,
    EquationPipe,
    LoginComponent,
    ExerciseComponent,
    LevelpageComponent,
    StartComponent,
    MenuComponent,
    DemoComponent,
    QuizComponent,
    QuizIntroComponent,
    TrainingComponent,
    TrainingSetupComponent,
    WebsiteComponent,
    TopicsComponent,
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
    // AngularFirestoreModule, TODO: Do I need this?
    RouterModule,
    MathjaxModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
    /* {
      provide: USE_AUTH_EMULATOR,
      useValue: environment.useEmulators
        ? ['http://localhost', 9099]
        : undefined,
    },
    */
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 8080] : undefined,
    },
    /*
    {
      provide: USE_FUNCTIONS_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 5001] : undefined,
    },
    */
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
