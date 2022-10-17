import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countDown',
})
export class CountDownPipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    if (minutes < 1) {
      return Math.floor(value - minutes * 60) + ' s';
    }
    return minutes + ' min';
    // return ('00' + minutes).slice(-2) + ' min';
    /* with seconds
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
    */
  }
}
