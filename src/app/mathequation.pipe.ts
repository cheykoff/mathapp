import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equation',
})
export class EquationPipe implements PipeTransform {
  transform(value: string): string {
    const splittedQuestion = value.split('$$$');
    splittedQuestion[1] = '$' + splittedQuestion[1] + '$';
    return splittedQuestion[1];
  }
}
