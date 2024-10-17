import {Component, Input} from '@angular/core';
import { PostsService } from 'src/app/services/login.service';
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
    private loginService: PostsService,


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
          console.log({response});
          this.pricingService.addPayment({

            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            signature:response.razorpay_signature,
            userId:this.loginService.userData._id,
            amount:amount,
            membership:code

          }).subscribe({
            next:(data:any)=>{
              console.log({data});
               this.pricingService.setUserDetail()
              
            }
          })
         let a =  {
            "razorpay_payment_id": "pay_P9pApDNtmUK1xE",
            "razorpay_order_id": "order_P9pAQFVZvYEe5v",
            "razorpay_signature": "30d9d3dcaed4689b6500e35274d1c67d636359e2875f2df5291a6e56e4789b84"
        }
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