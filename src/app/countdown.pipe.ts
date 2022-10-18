import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countDown',
})
export class CountDownPipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.ceil(value / 60);
    if (minutes <= 1) {
      return Math.floor(value - (minutes - 1) * 60) + ' s';
    }
    return minutes + ' min';
  }
}
