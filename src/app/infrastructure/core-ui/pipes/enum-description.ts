import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumDescription'
})
export class EnumDescriptionPipe implements PipeTransform {

  transform(enumValue: any, enumType: any): any {
    const description = enumType[enumValue];
    return description || enumValue;
  }

}
