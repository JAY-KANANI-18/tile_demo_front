// file-upload.service.ts
import { Injectable } from '@angular/core';
import * as tus from 'tus-js-client';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private tusEndpoint = 'http://localhost:8080/files'; // tusd server endpoint

  uploadFiles(files: File[], onProgress: (percentage: number, file: File) => void, onComplete: (url: string) => void) {
    files.forEach(file => this.uploadFile(file, onProgress, onComplete));
  }

  private uploadFile(file: File, onProgress: (percentage: number, file: File) => void, onComplete: (url: string) => void) {
    // Check local storage for previous uploads
    const uploadUrl = localStorage.getItem(`tus-upload-${file.name}`);
    const folderPrefix = `user-uploads/${"userId"}/`; // dynamically set based on user, input, etc.

    console.log({file});
    
    const upload = new tus.Upload(file, {
      endpoint: this.tusEndpoint,
    //   resume: uploadUrl !== null, // Resume if there's a previous upload URL
      metadata: {
        filename: file.name,
        filetype: file.type,
        // folder: folderPrefix, // Add a custom 'folder' metadata

      },
      chunkSize: 5 * 1024 * 1024, // 5MB chunks
      onError: (error:any) => {
        console.error('Upload failed:', error);
      },
      onProgress: (bytesUploaded:any, bytesTotal:any) => {
        const percentage = (bytesUploaded / bytesTotal) * 100;
        onProgress(percentage, file);
      },
      onSuccess: () => {
        const fileUrl = upload.url!;
        localStorage.removeItem(`tus-upload-${file.name}`); // Clear local storage entry
        onComplete(fileUrl);
        console.log('Upload complete:', fileUrl);
      },
      onAfterResponse: (statusCode:any, header:any) => {
        if (statusCode === 200) {
          // Save the upload URL for resuming later
          localStorage.setItem(`tus-upload-${file.name}`, upload.url!);
        }
      }
    });

    upload.start();
  }
}
