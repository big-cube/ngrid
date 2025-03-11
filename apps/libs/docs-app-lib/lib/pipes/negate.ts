import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:"negate",
  standalone: false,
})
export class PblNegatePipe implements PipeTransform {
  transform(value: any): boolean {
    return !value;
  }
}
