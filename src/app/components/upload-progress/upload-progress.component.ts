// src/app/file-upload/file-upload.component.ts
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PricingService } from 'src/app/services/pricing.servive';

@Component({
  selector: 'upload-file-progress',

    templateUrl: './upload-progress.component.html',
    styleUrls: ['./upload-progress.component.css'],
    animations: [
      trigger('openClose', [
        state('open', style({
          height: '*', // Auto height when open
          opacity: 1,
        })),
        state('closed', style({
          height: '0px', // Height is 0 when closed
          opacity: 0,
        })),
        transition('open <=> closed', [
          animate('0.5s ease-in-out') // You can adjust the duration here
        ]),
      ]),
    ],
  })
export class UploadProgressComponent {
    selectedFiles: File[] = [];
    isUploading = false;
    isOpen = false;
    status=true;
  
    constructor(public pricingServide:PricingService) {}
  
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        this.selectedFiles = Array.from(input.files);
      }
    }
  
    onUpload() {
      this.isUploading = true;
      // Simulate upload process
      setTimeout(() => {
        this.isUploading = false;
      }, 2000); // Simulate 2-second upload time
    }
  
    onClose(): void {
    }
    onOpen(){
      this.isOpen = !this.isOpen
    }
}
