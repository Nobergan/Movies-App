import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isInArray',
})
export class IsInArrayPipe implements PipeTransform {
  transform<T>(value: T, array: T[]): boolean {
    return (array || []).includes(value);
  }
}
