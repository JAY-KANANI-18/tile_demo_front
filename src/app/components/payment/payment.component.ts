// payment.component.ts
import { Component } from '@angular/core';
import { PricingService } from 'src/app/services/pricing.servive';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {
  constructor(private paymentService: PricingService) {}

  makePayment(amount: number) {

  }
}
