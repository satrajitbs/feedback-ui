import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';

class AppErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.error('Global error:', error);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    { provide: ErrorHandler, useClass: AppErrorHandler },
    MessageService
  ]
};
