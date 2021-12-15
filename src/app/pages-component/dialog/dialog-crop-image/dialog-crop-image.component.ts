import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  image: string;
  name: string;
}

@Component({
  selector: 'app-dialog-crop-image',
  templateUrl: './dialog-crop-image.component.html',
  styleUrls: ['./dialog-crop-image.component.css']
})
export class DialogCropImageComponent implements OnInit {
  imageChangedEvent: any = '';
  //croppedImage: any = '';
  LoadedImage: any = '';

  constructor(public dialogRef: MatDialogRef<DialogCropImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.data.image = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  
  onNoClick(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }
}
