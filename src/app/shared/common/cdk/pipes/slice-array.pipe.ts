import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceArray',
})
export class SliceArrayPipe implements PipeTransform {
  transform<T>(array: T[], count: number): T[] {
    return array.slice(0, count);
  }
}
