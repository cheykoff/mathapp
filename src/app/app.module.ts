import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);

import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat'; // TODO: Remove compat
import { RouterModule } from '@angular/router';
import { MathjaxModule } from 'mathjax-angular';

import { AppComponent } from './app.component';
import { ClassselectionComponent } from './components/classselection/classselection.component';
import { AppRoutingModule } from './app-routing.module';
import { ResultpageComponent } from './components/resultpage/resultpage.component';

import { CountDownPipe } from './countdown.pipe';
import { LoginComponent } from './components/login/login.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { LevelpageComponent } from './components/levelpage/levelpage.component';
import { MenuComponent } from './components/menu/menu.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TopicsComponent } from './components/topics/topics.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AutofocusDirective } from '../directives/autofocus.directive';
import { ChapterselectionComponent } from './components/chapterselection/chapterselection.component';
import { ExerciseFractionComponent } from './components/exercise/exercise-fraction/exercise-fraction.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassselectionComponent,
    ResultpageComponent,
    CountDownPipe,
    LoginComponent,
    ExerciseComponent,
    LevelpageComponent,
    MenuComponent,
    WelcomeComponent,
    TopicsComponent,
    StatisticsComponent,
    AutofocusDirective,
    ChapterselectionComponent,
    ExerciseFractionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase, 'mathapp')),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule, TODO: Do I need this?
    RouterModule,
    MathjaxModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' },
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 8080] : undefined,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
