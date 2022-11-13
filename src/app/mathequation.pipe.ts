import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equation',
})
export class EquationPipe implements PipeTransform {
  transform(value: string): string {
    const splittedQuestion = value.split('$$$');
    splittedQuestion[1] = '$' + splittedQuestion[1] + '$';
    console.log(splittedQuestion);
    /*
    const formattedQuestion =
      splittedQuestion[0] +
      '$' +
      splittedQuestion[1] +
      '$' +
      splittedQuestion[2];
      */
    return splittedQuestion[1];
  }
}
