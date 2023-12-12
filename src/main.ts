import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { initializeApp } from 'firebase/app';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { getAnalytics } from 'firebase/analytics';

if (environment.isProduction) {
	enableProdMode();
	// Import the functions you need from the SDKs you need

	// TODO: Add SDKs for Firebase products that you want to use

	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration

	// For Firebase JS SDK v7.20.0 and later, measurementId is optional

	// Initialize Firebase

	if (environment.firebase) {
		const app = initializeApp(environment.firebase);
		const analytics = getAnalytics(app);
	}
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));
