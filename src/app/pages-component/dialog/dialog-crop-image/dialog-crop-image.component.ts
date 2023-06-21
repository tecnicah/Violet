import { Component, OnInit, Inject } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
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
  rotation = 0;
  scale = 1;
  transform: ImageTransform = {};

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
  cropperReady(event) {
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

zoomOut() {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
}

zoomIn() {
    this.scale += .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
 }
 updateRotation() {
  this.transform = {
      ...this.transform,
      rotate: this.rotation
  };
}
}
