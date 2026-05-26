import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), //  //permet de logger proprement les erreurs
    provideZoneChangeDetection({ eventCoalescing: true }), //optimisation qui fusionne plusieurs évènements afin de recharger en une fois
    provideRouter(routes,
      withComponentInputBinding()), // permet de récupérer automatiquement les paramètres dans l'URL comme l'id
          // ou des paramètres de recherche ex : ?search=typescriptet de les injecter directements dans les input()
          // de nos composants. DOnc plus besoin d'injecter manuellement ActivatedRoute et de faire un snapshot.paramMap.get('id')
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark-mode',
        },
      },
    }),
    provideHttpClient(),
    MessageService,
  ],
};
