import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadProgressComponent } from 'src/app/components/upload-progress/upload-progress.component';
import { PostsService } from 'src/app/services/login.service';
import { PricingService } from 'src/app/services/pricing.servive';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
  public selected_collection: any;
  images_list: any;
  public user = localStorage.getItem("User") || ""
  selectedFolder: any;
  selectedImage: any;
  @ViewChild('fileInput1') fil!: ElementRef;
  ReadyToUpload = true
  uploadData: any = null


  constructor(
    public pricingService: PricingService,
    private ngbService: NgbModal,
    private loginSevice: PostsService,
    private router: Router,
    private socket: SocketService,
    public dialog: MatDialog

  ) {


    socket.getUploadStatus(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.event == "upload.status") {
            if(data.fstatus && data.id) {
              const file = this.pricingService.uploadProgress.files.find((f:any) => f.id ===  data.id);
              if (file) {
                file.status = data.fstatus;
                if(data.fstatus == 2) this.pricingService.uploadProgress.files.completed++
                console.log(`File with ID ${data.id} updated to status: ${data.status}`);
              } else {
                console.log(`File with ID ${data.id} not found.`);
              }
            }
          if (data?.status === 2) {
            setTimeout(() => {
              pricingService.uploadObj.uploading = false
            }, 500);
            
            this.onCollection(this.selected_collection)

          } else {
            pricingService.uploadObj.uploading = true

          }
          pricingService.uploadObj.total = data?.total
          pricingService.uploadObj.uploaded = data?.uploaded
          pricingService.uploadObj.processed = data?.processed
          pricingService.uploadObj.fails = data?.fails
        }
      }
    })

    socket.sendMessage("hello")
    if (!this.user) {
      loginSevice.logOut()
    }

    if (!pricingService.collection) {

      router.navigate(["/Portfolio"])
    }
    this.onCollection(pricingService.collection)
  }

  onCollection(collection: any) {


    this.pricingService.get_collection_details({ "collection_name": collection?.name }).subscribe({
      next: (data: any) => {

        this.selected_collection = data.data
        this.images_list = data.data?.images || []
        if (data.data.isUploading) {
          this.pricingService.uploadObj.uploading = data.data.isUploading
        }

      }
    })

  }
  imageDownload(user: any, image: any) {
    this.pricingService.download_image({ "filename": user + "/" + this.selected_collection._id + "/" + image }).subscribe({
      next: (data: any) => {
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

  async uploadBatch(filesBatch: File[]) {
    const formData = new FormData();
    filesBatch.forEach((file:any) => {
      console.log({file});
      
      formData.append('files', file);
      formData.append('ids',file.id);
    });
  
    let user: any = localStorage.getItem("User");
    formData.append("collection_id", this.selected_collection._id);
    formData.append("user_id", user);
  
    this.ReadyToUpload = false;
    this.pricingService.uploadObj = {
      uploading: true,
      total: 0,
      completed: 0,
      fails: 0
    };
  
    try {
      const data = await this.pricingService.add(formData).toPromise();
      this.ReadyToUpload = true;
      this.onCollection(this.selected_collection);
    } catch (error) {
      console.error("Batch upload failed", error);
    }
  }

  async onAdd(modal: any) {

    // const zip = new JSZip();
    let fil: any = this.fil

    console.log(fil);


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








    // console.log(fil);




    // const files = this.selectedFolder;

    // // let list = await this.uploadmagesToBucket(files)

    // let formData = new FormData()

    // for (let i = 0; i < files.length; i++) {
    //   formData.append('files', files[i]);
    // }
    // console.log(formData);
    // let user:any = localStorage.getItem("User")
    // formData.append("collection_id", this.selected_collection._id);
    // formData.append("user_id", user);
    // this.ReadyToUpload = false
    // this.pricingService.uploadObj  = {
    //   uploading:true,
    //   total : 0,
    //   completed:0,
    //   fails:0
    // }
    // this.pricingService.add(formData).subscribe({
    //   next: (data: any) => {
    //     this.ReadyToUpload = true

    //     this.onCollection(this.selected_collection)

    //   }
    // })


    


    const MAX_BATCH_SIZE = 100 * 1024 * 1024; // 100 MB in bytes
    const files = this.selectedFolder;
    
    // Helper function to convert file size to readable format
    const getFileSize = (file: File) => file.size;
    
    let batch = [];
    let currentBatchSize = 0;
    for (let i = 0; i < files.length; i++) {
      files[i].status = 0
      files[i].id = this.generateUniqueId()
      this.pricingService.uploadProgress.files.push(files[i])
    }
    
    for (let i = 0; i < files.length; i++) {
      const fileSize = getFileSize(files[i]);
      // Check if adding the file exceeds the batch limit
      if (currentBatchSize + fileSize > MAX_BATCH_SIZE) {
        // Send the current batch
        await this.uploadBatch(batch);
    
        // Reset batch
        batch = [];
        currentBatchSize = 0;
      }
    
      // Add file to the batch
      batch.push(files[i]);
      currentBatchSize += fileSize;
      files[i].status = 1

    }
    
    // Upload the remaining batch
    if (batch.length > 0) {
      await this.uploadBatch(batch);
    }
















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
  generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
  


  async onAddwithUrl(modal: any) {

    // const zip = new JSZip();
    let fil: any = this.fil

    console.log(fil);


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

    console.log(fil);




    let formData = new FormData();
    let files = this.selectedFolder;
    let list = [];

    for (let i = 0; i < files.length; i++) {
      list.push(files[i].name);
    }

    // Append the array of strings to the FormData
    formData.append('fileNames', JSON.stringify(list));
    formData.append('collectionId', this.selected_collection);
    formData.append('userId', this.loginSevice.userData._id);

    this.ReadyToUpload = false
    this.pricingService.uploadObj = {
      uploading: true,
      total: 0,
      completed: 0,
      fails: 0
    }
    let count = 0
    this.pricingService.addWithUrl(formData).subscribe({
      next: (data: any) => {
        this.ReadyToUpload = true
        console.log({ data });
        let { urls } = data
        for (let i = 0; i < urls.length; i++) {
          let url = urls[i]
          this.pricingService.addInCloud(url, files[i]).subscribe({
            next: (data: any) => {
              count++
              console.log(count);

            }
          })
        }


        // this.onCollection(this.selected_collection)

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


  uploadmagesToBucket(files: any) {

    return new Promise((resolve, reject) => {


      let list: any = []

      for (let i = 0; i < files.length; i++) {

        let file = files[i]
        const formDataObj = new FormData();
        list.push(file?.name);

        // formDataObj.append('files', files[0]);
        this.pricingService.get_put_url({ filename: `${this.user}/${file?.name}` }).subscribe({
          next: (data: any) => {
            this.pricingService.save_files(data.presigned_url, file)

            console.log("success", i);

            if (i == (files.length - 1)) {
              resolve(list)
            }
          }
          , error: (error) => {
            console.log(error, i);


          }
        })
      }
    })
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

      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event: any) => {
        this.selectedImage = event.target.result
      }
    }
  }
}
