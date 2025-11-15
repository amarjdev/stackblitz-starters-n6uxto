import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <mat-card class="image-picker-card">
      <mat-card-content>
        <div class="image-preview" *ngIf="selectedImage">
          <img [src]="selectedImage" alt="Selected image" />
        </div>
        <div class="image-placeholder" *ngIf="!selectedImage">
          <mat-icon>image</mat-icon>
          <p>No image selected</p>
        </div>
        <button mat-raised-button color="primary" (click)="fileInput.click()" class="upload-btn">
          <mat-icon>upload</mat-icon>
          Select Image
        </button>
        <input
          #fileInput
          type="file"
          accept="image/*"
          (change)="onFileSelected($event)"
          hidden
        />
        <button
          *ngIf="selectedImage"
          mat-stroked-button
          (click)="clearImage()"
          class="clear-btn"
        >
          <mat-icon>close</mat-icon>
          Clear
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .image-picker-card {
      max-width: 300px;
      margin: 20px 0;
    }

    mat-card-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      padding: 20px;
    }

    .image-preview {
      width: 100%;
      max-width: 250px;
    }

    .image-preview img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .image-placeholder {
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      border-radius: 8px;
      border: 2px dashed #ccc;
      color: #999;
    }

    .image-placeholder mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #ccc;
      margin-bottom: 8px;
    }

    .upload-btn {
      width: 100%;
    }

    .clear-btn {
      width: 100%;
    }
  `]
})
export class ImagePickerComponent {
  selectedImage: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  clearImage(): void {
    this.selectedImage = null;
  }
}
