# DieMatheApp

This app allows highschool teachers to give their students quizzes to assess their knowledge and practice the basics.

## Usage of the app

You find the app on https://diematheapp.de
The content is in German and focused on highschools ("Gymnasium") in Bavaria, Germany.
It is free, doesn't display ads, and does not require any personal data (not even an email).

### Quizzes

Quizzes allow to assess the math skills of the students within 30 min.

### Exercises

Exercises allow students to practice the basics and progress towards fluency.

### Successes

Successes show the total number of exercises tried and solved and the number of stars that were collected.

## Technical Implementation

DieMatheApp is written in Angular and uses Firebase as a backend and database.

### Architecture

The whole app is only one module and screens are separated components.
Communications are done in services.

### Packages

- AngularFire to communicate between the Angular app and Firebase
- MathJax to display math signs and formula properly
