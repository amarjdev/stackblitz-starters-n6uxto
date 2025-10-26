import { Component } from '@angular/core';
import * as imagepicker from '@nativescript/imagepicker';
import { ImageSource } from '@nativescript/core';

@Component({
  selector: 'app-image-picker',
  template: `
    <StackLayout>
      <Image [src]="imageSrcStr" width="200" height="200"></Image>
      <Button text="Select Photo" (tap)="selectPhoto()"></Button>
    </StackLayout>
  `,
})
export class ImagePickerComponent {
  public imageSrc: ImageSource | string = 'https://placehold.it/200x200'; // Placeholder
  public imageSrcStr:string = '';
  constructor() {}

  public async selectPhoto() {
    try {
      const context = imagepicker.create({
        mode: 'single', // 'single' or 'multiple'
      });

      // Request authorization (required for iOS)
      const authResult = await context.authorize();

      if (authResult.authorized) {
        const selection = await context.present();
        if (selection && selection.length > 0) {
          const selectedAsset = selection[0];
          const source = await ImageSource.fromAsset(selectedAsset);
          this.imageSrc = source;
        }
      } else {
        console.warn('Authorization not granted for image picker.');
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
    }
  }
}