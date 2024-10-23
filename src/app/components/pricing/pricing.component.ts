import { Component, ViewChild } from '@angular/core';
import { PostsService } from 'src/app/services/login.service';
import { PricingService } from 'src/app/services/pricing.servive';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})

export class pricingComponent {
  title = 'Pricing';
  @ViewChild('content') content: any;
  constructor(public pricingService:PricingService,public loginService:PostsService) {}

  pricingBoxes = [
    {
      name: 'basic',
      price: 2999,
      features: [
        '10 GB of storage',
        'upto 1 users',
        'upto 1 collection',
        '1000 searches'

      ],
      code:420
    },
    {
      name: 'Pro',
      price: 5900,
      features: [
        '50 GB of storage',
        'upto 1 users',
        'upto 10 collection',
        'Compare function',
        '10000 searches'

      ],
      code:421

    },
    {
      name: 'Business',
      price: 19999,
      features: [
        '100 GB of storage',
        'upto 3 users',
        'unlimited collection',
        'Compare function',
        'unlimited searches'

      ],
      code:422

    }
  ];

  ngAfterViewInit() {
    // Initialize modal with a reference after the view is ready
    this.pricingService.setModalContent(this.content)
  }
  
  onTryFree(){
    this.pricingService.addPayment({
      orderId:null,
      paymentId:null,
      signature:null,
      userId:this.loginService.userData._id,
      amount:0,
      membership:420
    }).subscribe({
      next:(data:any)=>{
        console.log({data});
         this.pricingService.setUserDetail()
        
      }
    })
  }
}