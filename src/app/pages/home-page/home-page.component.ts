import {
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PricingService } from "src/app/services/pricing.servive";
import { environment } from "src/app/environments/environment";

@Component({
  selector: "app-homepage",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {


  public Vehicles:any = [];
  public title = "Add Vehicle";
  public UpdateActivate = false;
  public SubmitActivate = true;
  public vehicleName: any;
  public allVehicles: any;
  public vehicleForm: any;
  selectedImage: any;


  private updateId = "";

  constructor(
    private pricingService: PricingService,
    private ngbService: NgbModal,

  ) { }

  ngOnInit() {
    this.getCarpets();
  }

  createVehicleTypeForm() {
    this.vehicleForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      file: new FormControl(null, [Validators.required]),

    });
  }
  async onSearch(val: any) {
    console.log(val);
    this.Vehicles = this.allVehicles.filter((vehicle: any) =>
      vehicle.name.toLowerCase().includes(val.toLowerCase())
    );
  }
  getCarpets() {
    this.pricingService.getAllCarpet().subscribe(
      {
        next: (data: any) => {
          this.Vehicles = []
          
          data.carpets.forEach((each:any) => {
            this.Vehicles.push({image:each.name})
            
          });
          console.log(this.Vehicles);

          // this.Vehicles = data.carpets
console.log(data);

        },error:(error)=>{


        }
      }


    );
  }

  search(files: any, modal: any=null) {

    const file = files.files[0];
    const formDataObj = new FormData();

    // if (file.size >= 1000000) {
    //   this.toster.error('File should be less than 1 Mb')
    //   return;
    // }

    // formDataObj.append("name", this.vehicleForm.value.name);
    formDataObj.append("file", file);

    this.pricingService.search(formDataObj).subscribe({
      next: (data:any) => {
        const valuesArray = Object.values(data)
        // if(data.msg){
        //   this.toster.success(data.msg)

        // }
        // modal.dismiss('Click')

        const convertedArray:any = Object.keys(data).map(key => ({
          image: data[key].image,
          similarity_percentage: data[key].similarity_percentage
        }));
        
        this.Vehicles = []

for (let each:any = 0; each < convertedArray.length; each++) {
//   const element = array[index];
  
// }

        // for (let each in convertedArray) {

          let e = convertedArray[each]
          let imageUrl:any = e.image;
          console.log(imageUrl);
          let pa = imageUrl.split('/')
          let name:any = pa[pa.length-1]
          convertedArray[each].image = name
          // this.Vehicles.push(name)
 
        }
        this.Vehicles = convertedArray
        console.log(convertedArray);
        this.Vehicles.reverse()
        console.log(this.Vehicles);
        // this.vehicleForm.reset()
      },
      error: (error) => {

        if (error.error.msg) {

        }
      },
    });
  }
  openModel(content:any){
    this.ngbService.open(content)

  }

  onAdd(files:any,modal:any){

    const file = files.files[0];
    const formDataObj = new FormData();

    // if (file.size >= 1000000) {
    //   this.toster.error('File should be less than 1 Mb')
    //   return;
    // }

    // formDataObj.append("name", this.vehicleForm.value.name);
    formDataObj.append("file", file);
    this.pricingService.add(formDataObj).subscribe({
      next: (data:any) => {
        console.log(data);
        // const valuesArray = Object.values(data)
        // if(data.msg){
        //   this.toster.success(data.msg)

        // }
        // modal.dismiss('Click')
        this.getCarpets()

              modal.dismiss('Click')

      },
      error: (error) => {

        if (error.error.msg) {

        }
      },
    });

  }



  onFileSelected(e: any) {
    if (e.target.files) {
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event: any) => {
        this.selectedImage = event.target.result
      }
    }
  }


}
