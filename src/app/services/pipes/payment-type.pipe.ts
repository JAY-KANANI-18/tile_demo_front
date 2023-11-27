import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentType'
})
export class PaymentTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 0:
        return 'cash';
      case 1:
        return 'card';


    }  }

}
