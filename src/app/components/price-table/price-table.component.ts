import {Component, Input} from '@angular/core';
import { PricingService } from 'src/app/services/pricing.servive';
declare var Razorpay: any;

@Component({
  selector: 'app-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.css']
})

export class PriceTableComponent {

  constructor(
    private pricingService: PricingService,


  ) { }
  @Input() pricingBox: { name: string; price: number; features: string[]; } | any;

  async onPurchase(amount:number,code:number) {
    this.pricingService.makePayment({amount, currency:'INR',code}).subscribe((order: any):any => {
      if(order.code === 420){
        return this.pricingService.currentmodal.dismiss('close')
      }
      const options = {
        key: 'rzp_test_TtzBdi6HRahS8U', // Replace with your Razorpay key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Design Finder',
        description: 'Payment for Order MemberShip',
        order_id: order.id, // Order ID from Razorpay
        handler: (response: any) => {
          // This function will be called after payment is successful
          console.log(`Payment successful: ${response.razorpay_payment_id}`);
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '1234567890',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: () => {
            console.log("Payment failed .");
            alert("Payment failed.");
          }
        }
      };
      
      
      this.pricingService.currentmodal.dismiss('close')
      const razorpay = new Razorpay(options);
      razorpay.open(); // This opens the Razorpay payment modal
    });
  }

}