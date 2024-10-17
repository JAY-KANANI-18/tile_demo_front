import { Component, ViewChild } from '@angular/core';
import { PostsService } from 'src/app/services/login.service';
import { PricingService } from 'src/app/services/pricing.servive';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent {
  @ViewChild('content') content: any;
  constructor(public pricingService:PricingService,public loginService:PostsService) {}
  ngAfterViewInit() {
    // Initialize modal with a reference after the view is ready
    this.pricingService.setModalContent(this.content)
  }
}
