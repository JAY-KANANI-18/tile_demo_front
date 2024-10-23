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
  imageWidth:any = 0
  imageHeight:any = 0
  constructor(public pricingService:PricingService,public loginService:PostsService) {}
  ngAfterViewInit() {
    // Initialize modal with a reference after the view is ready
    this.pricingService.setModalContent(this.content)
  }
  onCompare(){
    this.pricingService.compareObj.isCompare = !this.pricingService.compareObj.isCompare
    console.log(this.pricingService.compareObj);
    
  }
  setImageWidth(imageElement: HTMLImageElement,mod:any){
    this.imageWidth = imageElement.naturalWidth;
    this.imageHeight = imageElement.naturalHeight;
    console.log({mod});
    const parentWidth = mod.offsetWidth;
    const parentHeight = mod.offsetHeight;
    

  }
  onMount(e:any){
    console.log(e);
    

  }
}
