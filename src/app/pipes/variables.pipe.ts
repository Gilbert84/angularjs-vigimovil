import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'variable'
})
export class VariablePipe implements PipeTransform {

  transform( value: string): any {
      //propeades de los pipe es value
      // args es otra propiedad y args1,args2 etc 
    if (value) {
        console.log('true', value);
        return 'activo';
    }else {
        console.log('fasle', value);
        return 'inactivo';
    }

  }

}
