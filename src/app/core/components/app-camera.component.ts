import { Component } from '@angular/core';
import * as camera from 'nativescript-camera';
import { ImageSource } from '@nativescript/core';

@Component({
  selector: 'app-camera',
  template: `
    <StackLayout>
      <Image [src]="imageSrc"Str width="200" height="200"></Image>
      <Button text="Take Picture" (tap)="takePicture()"></Button>
    </StackLayout>
  `,
})
export class CameraComponent {
  public imageSrc: ImageSource | string = 'https://placehold.it/200x200'; // Placeholder
 public imageSrcStr:string = ''
  constructor() {}

  public async takePicture() {
    try {
      // Request permissions if not already granted
      await camera.requestPermissions();

      const imageAsset = await camera.takePicture({
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: false, // Set to true to save to device gallery
      });

      // Convert ImageAsset to ImageSource for display
      const source = await ImageSource.fromAsset(imageAsset);
      this.imageSrc = source;
      this.imageSrcStr = '';
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }
}