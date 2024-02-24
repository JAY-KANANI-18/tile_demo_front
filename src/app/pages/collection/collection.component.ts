import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/login.service';
import { PricingService } from 'src/app/services/pricing.servive';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
  selected_collection: any;
  images_list: any;
  public user = localStorage.getItem("User") || ""
  selectedFolder: any;
  selectedImage: any;

  constructor(
    private pricingService: PricingService,
    private ngbService: NgbModal,
    private loginSevice: PostsService,
    private router: Router

  ) {
    if(!this.user){
      loginSevice.logOut()
    }

    if (!pricingService.collection){

      router.navigate(["/Portfolio"])
    } 
    this.onCollection(pricingService.collection)
   }

  onCollection(collection: any) {


    this.pricingService.get_collection_details({ "collection_name": collection.name }).subscribe({
      next: (data: any) => {
        console.log(data);

        this.selected_collection = data.data
        this.images_list = data.data?.images || []

      }
    })

  }
  imageDownload(user: any, image: any) {
    this.pricingService.download_image({ "filename": user + "/" + image }).subscribe({
      next: (data: any) => {
        console.log(data);
        // this.router.navigateByUrl()


        const preSignedUrl = data.presigned_grt_url

        // Create a link element
        const link = document.createElement('a');
        link.setAttribute('href', preSignedUrl);
        link.setAttribute('download', ''); // Optional: Specify the file name for download
        document.body.appendChild(link);

        // Trigger a click event on the link
        link.click();

        // Clean up
        document.body.removeChild(link);


      }
    })
  }
  onAdd(fil: any, modal: any) {

    // const zip = new JSZip();


    // const folderName = this.selectedFolder.name;

    // Create a folder in the zip file
    // const folder: any = zip.folder(folderName);

    // console.log(folder);


    // Iterate through files in the selected folder and add them to the zip
    // Assuming this.selectedFolder is a File object representing the selected folder
    // const files = Array.from(this.selectedFolder);

    // let file: any
    // for (file of files) {
    //   // Assuming each file is an image; adjust this condition based on your actual use case
    //   // if (file.type.startsWith('image/')) {
    //   folder.file(file.name, file);
    //   // }
    // }




    // zip.file(this.selectedFolder.name,this.selectedFolder);



    // zip.generateAsync({ type: 'blob' })
    // .then((content) => {
    // const formData = new FormData();
    // console.log(fil);

    // formData.append('zipFile', content, 'folder.zip');

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










    const files = fil.files;
    console.log(files);






    // // if (file.size >= 1000000) {
    // //   this.toster.error('File should be less than 1 Mb')
    // //   return;
    // // }
    let list = []
    for (const file of files) {
      const formDataObj = new FormData();
      list.push(file.name);

      // formDataObj.append('files', files[0]);
      this.pricingService.get_put_url({ filename: `${this.user}/${file.name}` }).subscribe({
        next: (data: any) => {
          console.log(data);
          this.pricingService.save_files(data.presigned_url, file)


        }
      })
    }
    this.pricingService.add({ "files": list, "collection_id": this.selected_collection._id, "user_id": localStorage.getItem("User") }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.onCollection(this.selected_collection)

      }
    })




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
  openModel(content: any) {
    this.selectedImage = ""
    this.ngbService.open(content)

  }


  onFileSelected(e: any) {

    this.selectedFolder = e.target.files;
    // console.log(this.selectedFolder[0].fileEntry);

    // if (this.selectedFolder.length === 1 && this.selectedFolder[0].fileEntry) {
    //   console.log('innnnnnnnnn');

    //   const fileEntry = this.selectedFolder[0].fileEntry as FileSystemFileEntry;
    //   fileEntry.file((file: File) => {
    //     // Handle the dropped file
    //     this.zipAndSendFolder(file);
    //   });
    // }


    // console.log(e.target.files);

    if (e.target.files) {
      let reader = new FileReader()
      console.log(reader);

      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event: any) => {
        this.selectedImage = event.target.result
      }
    }
  }
}
