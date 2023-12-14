import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.isProduction) {
	enableProdMode();
	// Import the functions you need from the SDKs you need

	// TODO: Add SDKs for Firebase products that you want to use

	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration

	// For Firebase JS SDK v7.20.0 and later, measurementId is optional

	// Initialize Firebase
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
