import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-camera-capture',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <mat-card class="camera-card">
      <mat-card-content>
        <div class="camera-container" *ngIf="!capturedImage">
          <video #videoElement class="video-feed" autoplay playsinline></video>
          <div class="camera-controls">
            <button mat-fab color="primary" (click)="startCamera()" *ngIf="!cameraActive">
              <mat-icon>videocam</mat-icon>
            </button>
            <button mat-fab color="warn" (click)="stopCamera()" *ngIf="cameraActive">
              <mat-icon>videocam_off</mat-icon>
            </button>
            <button mat-fab color="accent" (click)="capturePhoto()" *ngIf="cameraActive">
              <mat-icon>photo_camera</mat-icon>
            </button>
          </div>
        </div>

        <div class="preview-container" *ngIf="capturedImage">
          <img [src]="capturedImage" alt="Captured image" class="captured-preview" />
          <div class="preview-controls">
            <button mat-raised-button color="primary" (click)="retakePhoto()">
              <mat-icon>refresh</mat-icon>
              Retake
            </button>
            <button mat-raised-button color="accent" (click)="usePhoto()">
              <mat-icon>check</mat-icon>
              Use Photo
            </button>
          </div>
        </div>

        <canvas #canvasElement hidden></canvas>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .camera-card {
      max-width: 400px;
      margin: 20px 0;
    }

    mat-card-content {
      padding: 20px;
    }

    .camera-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
    }

    .video-feed {
      width: 100%;
      max-width: 350px;
      height: 300px;
      background-color: #000;
      border-radius: 8px;
      object-fit: cover;
    }

    .camera-controls {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    .preview-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
    }

    .captured-preview {
      width: 100%;
      max-width: 350px;
      height: 300px;
      border-radius: 8px;
      object-fit: cover;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .preview-controls {
      display: flex;
      gap: 12px;
      width: 100%;
      justify-content: center;
    }

    .preview-controls button {
      flex: 1;
      max-width: 150px;
    }
  `]
})
export class CameraCaptureComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  cameraActive = false;
  capturedImage: string | null = null;
  private stream: MediaStream | null = null;

  async startCamera(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      this.videoElement.nativeElement.srcObject = this.stream;
      this.cameraActive = true;
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.cameraActive = false;
  }

  capturePhoto(): void {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      this.capturedImage = canvas.toDataURL('image/jpeg');
      this.stopCamera();
    }
  }

  retakePhoto(): void {
    this.capturedImage = null;
  }

  usePhoto(): void {
    if (this.capturedImage) {
      console.log('Photo captured successfully');
    }
  }
}
