import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImagePickerComponent } from '../core/components/image-picker.component';
import { CameraCaptureComponent } from '../core/components/camera-capture.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ImagePickerComponent,
    CameraCaptureComponent
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport
          [mode]="'side'"
          [opened]="true">
        <mat-toolbar>Menu</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item>
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>Home</span>
          </a>
          <a mat-list-item>
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item>
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Settings</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>Dashboard</span>
        </mat-toolbar>
        <div class="content">
          <h2>Spending Tracker</h2>
          <div class="controls-row">
            <div class="control-section">
              <h3>Upload from Gallery</h3>
              <app-image-picker></app-image-picker>
            </div>
            <div class="control-section">
              <h3>Capture with Camera</h3>
              <app-camera-capture></app-camera-capture>
            </div>
          </div>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }
    .sidenav {
      width: 250px;
    }
    .content {
      padding: 20px;
    }
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .controls-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 20px;
    }
    .control-section h3 {
      margin-top: 0;
      margin-bottom: 16px;
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }
    @media (max-width: 900px) {
      .controls-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent {}