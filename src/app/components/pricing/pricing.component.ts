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
      name: 'Free',
      price: 0,
      features: [
        '1 GB of storage',
        'upto 1 users',
        'upto 1 collection',
        'upto 20 searches',

      ],
      code:420
    },
    {
      name: 'Pro',
      price: 59,
      features: [
        '20 GB of storage',
        'upto 3 users',
        'upto 10 collection',
        'upto 500 searches',
      ],
      code:421

    },
    {
      name: 'Business',
      price: 99,
      features: [
        '100 GB of storage',
        'upto 5 users',
        'unlimited collection',
        'unlimite searches',
      ],
      code:422

    }
  ];

  ngAfterViewInit() {
    // Initialize modal with a reference after the view is ready
    this.pricingService.setModalContent(this.content)
  }

}