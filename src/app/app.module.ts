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
