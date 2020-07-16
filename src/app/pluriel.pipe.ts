import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluriel'
})
export class PlurielPipe implements PipeTransform {

  transform(value: string,occ:number=2): string {
    if(occ==1)return value;
    if(value.endsWith("s") || value.endsWith("x"))return value;
    return value+"s";

  }

}
