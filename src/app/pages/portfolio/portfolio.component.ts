import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/login.service';
import { PricingService } from 'src/app/services/pricing.servive';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  is_add_collection: any = false;
  selected_collection: any;
  images_list: any;
  constructor(
    public pricingService: PricingService,
    private router: Router

  ) { }
  ngOnInit() {
    this.get_collections()

  }
  get_collections() {
    this.pricingService.get_collections().subscribe({
      next: (data: any) => {
        console.log({data3:data});
        
        this.pricingService.collectionList = data.carpets
        console.log({a:this.pricingService.collectionList});
        

      }, error: (error:any) => {
        console.log(error);

      }
    })
  }
  onColletionAdd() {
    this.is_add_collection = true
  }
  addCollection(name: any) {
    if(!name){
      return
    }
    this.pricingService.add_collections({ "name": name }).subscribe({
      next: (data: any) => {
        this.get_collections()
        this.is_add_collection = false

      }
    })

  }
  onCollection(collection: any) {


    this.pricingService.collection = collection
    this.router.navigate([`Portfolio/${collection.name}`])
    // this.pricingService.get_collection_details({ "collection_name": }).subscribe({
    //   next: (data: any) => {
    //     console.log(data);

    //     this.selected_collection = data.data
    //     this.images_list = data.data?.images || []

    //   }
    // })

  }
  onother() {
    window.alert("No , It's Not Working !!!!!  CLICK 'D' IF YOU FIND")
  }
}
