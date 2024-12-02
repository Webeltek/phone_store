import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true
})
export class SlicePipe implements PipeTransform {

  transform(value: string, maxcharsCount= 5): unknown {
    const dots = value.length > maxcharsCount ? '...' : '';
    return `${value.substring(0,maxcharsCount)}${dots}`;
  }

}
