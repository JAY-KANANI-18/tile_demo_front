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
import { environment } from "src/environments/environment";
import * as JSZip from 'jszip';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { PostsService } from "src/app/services/login.service";


@Component({
  selector: "app-homepage",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {


  public Vehicles: any = [];
  public title = "Add Vehicle";
  public UpdateActivate = false;
  public SubmitActivate = true;
  public vehicleName: any;
  public allVehicles: any;
  public vehicleForm: any;
  selectedImage: any;




  private updateId = "";
  selectedFolder: any;

  constructor(
    private pricingService: PricingService,
    private ngbService: NgbModal,
    private loginSevice:PostsService

  ) { }

  ngOnInit() {
    this.createVehicleTypeForm()
    this.getCarpets();
  }

  public droppedFiles: NgxFileDropEntry[] = [];


  public dropped(event: any): void {
    event.preventDefault(); // Prevent the default behavior

    this.droppedFiles = event.files;
    console.log(this.droppedFiles);

    if (this.droppedFiles.length === 1 && this.droppedFiles[0].fileEntry.isFile) {
      const fileEntry = this.droppedFiles[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        // Handle the dropped file
        this.zipAndSendFolder(file);
      });
    }
  }
  private zipAndSendFolder(file: File): void {
    const zip: any = new JSZip();
    const folderName = file.name.split('.')[0];

    // Assume the folder structure is preserved
    zip.folder(folderName).file(file.name, file);

    zip.generateAsync({ type: 'blob' }).then((blob: any) => {
      this.sendZipToBackend(blob);
    });



  }
  private sendZipToBackend(zipBlob: Blob): void {
    const formData = new FormData();
    formData.append('file', zipBlob, 'folder.zip');

    console.log(formData);


    // Replace 'your-backend-api-endpoint' with the actual endpoint

  }

  createVehicleTypeForm() {
    this.vehicleForm = new FormGroup({
      file: new FormControl(null),

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

          data.carpets.forEach((each: any) => {
            this.Vehicles.push({ image: each.name })

          });
          console.log(this.Vehicles);

          // this.Vehicles = data.carpets
          console.log(data);

        }, error: (error) => {


        }
      }


    );
  }

  search(files: any, modal: any = null) {

    const file = files.files[0];
    const formDataObj = new FormData();

    // if (file.size >= 1000000) {
    //   this.toster.error('File should be less than 1 Mb')
    //   return;
    // }

    // formDataObj.append("name", this.vehicleForm.value.name);
    formDataObj.append("file", file);

    this.pricingService.search(formDataObj).subscribe({
      next: (data: any) => {
        const valuesArray = Object.values(data)
        // if(data.msg){
        //   this.toster.success(data.msg)

        // }
        // modal.dismiss('Click')

        const convertedArray: any = Object.keys(data).map(key => ({
          image: data[key].image,
          similarity_percentage: data[key].similarity_percentage
        }));

        this.Vehicles = []

        for (let each: any = 0; each < convertedArray.length; each++) {
          //   const element = array[index];

          // }

          // for (let each in convertedArray) {

          let e = convertedArray[each]
          let imageUrl: any = e.image;
          console.log(imageUrl);
          let pa = imageUrl.split('/')
          let name: any = pa[pa.length - 1]
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
  openModel(content: any) {
    this.selectedImage = ""
    this.ngbService.open(content)

  }

  onAdd(fil: any, modal: any) {

    const zip = new JSZip();


    const folderName = this.selectedFolder.name;

    // Create a folder in the zip file
    const folder: any = zip.folder(folderName);

    console.log(folder);


    // Iterate through files in the selected folder and add them to the zip
    // Assuming this.selectedFolder is a File object representing the selected folder
    const files = Array.from(this.selectedFolder);

    let file: any
    for (file of files) {
      // Assuming each file is an image; adjust this condition based on your actual use case
      // if (file.type.startsWith('image/')) {
      folder.file(file.name, file);
      // }
    }




    // zip.file(this.selectedFolder.name,this.selectedFolder);



    // zip.generateAsync({ type: 'blob' })
    // .then((content) => {
    //   const formData = new FormData();
    //   formData.append('zipFile', content, 'folder.zip');

    //   // Replace 'your-upload-url' with the actual URL of your server endpoint that accepts file uploads

















    // this.pricingService.add(formData).subscribe({
    //   next: (data:any) => {
    //     console.log(data);
    //     // const valuesArray = Object.values(data)
    //     // if(data.msg){
    //     //   this.toster.success(data.msg)

    //     // }
    //     // modal.dismiss('Click')
    //     this.getCarpets()

    //           modal.dismiss('Click')

    //   },
    //   error: (error) => {

    //     if (error.error.msg) {

    //     }
    //   },
    // });










    // const files = fil.files;



    // const formDataObj = new FormData();


    // // if (file.size >= 1000000) {
    // //   this.toster.error('File should be less than 1 Mb')
    // //   return;
    // // }
    // for (const file of files) {
    //   formDataObj.append('files', file);
    // }





    // this.pricingService.add(formDataObj).subscribe({
    //   next: (data:any) => {
    //     console.log(data);
    //     // const valuesArray = Object.values(data)
    //     // if(data.msg){
    //     //   this.toster.success(data.msg)

    //     // }
    //     // modal.dismiss('Click')
    //     this.getCarpets()

    //           modal.dismiss('Click')

    //   },
    //   error: (error) => {

    //     if (error.error.msg) {

    //     }
    //   },
    // });

  }



  onFileSelected(e: any) {

    this.selectedFolder = e.target.files;
    console.log(this.selectedFolder[0].fileEntry);

    if (this.selectedFolder.length === 1 && this.selectedFolder[0].fileEntry) {
      console.log('innnnnnnnnn');

      const fileEntry = this.selectedFolder[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        // Handle the dropped file
        this.zipAndSendFolder(file);
      });
    }


    console.log(e.target.files);

    if (e.target.files) {
      let reader = new FileReader()
      console.log(reader);

      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event: any) => {
        this.selectedImage = event.target.result
      }
    }
  }
  // getFile(event:any){
  //   this.file = event.target.files[0]

  //   console.log("dropeed");


  // }


  logOut(){
    this.loginSevice.logOut()
  }
}