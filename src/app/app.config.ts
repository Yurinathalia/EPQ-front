import {
  ApplicationConfig,
  importProvidersFrom
} from '@angular/core';

import {
  provideHttpClient,
  withFetch
} from '@angular/common/http';

import {
  provideClientHydration
} from '@angular/platform-browser';

import {
  provideCharts,
  withDefaultRegisterables
} from 'ng2-charts';

import {
  FormsModule
} from '@angular/forms';

import {
  AppRoutingModule
} from './app-routing.module';

export const appConfig: ApplicationConfig = {

  providers: [

    importProvidersFrom(
      AppRoutingModule,
      FormsModule
    ),

    provideHttpClient(
      withFetch()
    ),

    provideClientHydration(),

    provideCharts(
      withDefaultRegisterables()
    )

  ]

};
