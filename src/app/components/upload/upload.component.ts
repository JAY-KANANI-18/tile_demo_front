// src/app/file-upload/file-upload.component.ts
import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-file-upload',
  template: `
    <input type="file" (change)="onFileSelected($event)" multiple />
    <button (click)="uploadFiles()">Upload Files</button>
    <div *ngFor="let file of files">
      <p>{{ file.name }} - {{ progress[file.name] || 0 }}%</p>
    </div>
  `
})
export class FileUploadComponent {
  files: File[] = [];
  progress: { [key: string]: number } = {};

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files);
    }
  }

  uploadFiles() {
    this.fileUploadService.uploadFiles(
      this.files,
      (percentage: number, file: File) => this.progress[file.name] = percentage,
      (url: string) => console.log('File available at:', url)
    );
  }
}
