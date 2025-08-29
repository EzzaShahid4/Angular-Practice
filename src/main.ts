import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Router + Location provider
    provideHttpClient(), // HttpClient provider
    provideAnimations(), // Enables Angular animations globally
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch((err) => console.error(err));
