import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'template'
})
export class TemplatePipe implements PipeTransform {
  transform(value: any[]): string {
    const tmp = [];
    value.forEach((element) => {
      tmp.push(element.name);
    });
    return tmp.join(', ');
  }

}
