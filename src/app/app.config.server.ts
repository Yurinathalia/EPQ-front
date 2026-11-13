// This project uses the NgModule SSR bootstrap in app.module.server.ts.
// Keep the shared application configuration here without registering SSR providers again.
import { appConfig } from './app.config';

export const config = appConfig;
