// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment, FirebaseConfig } from 'src/app/model/environment.model';

const firebaseConfig: FirebaseConfig = {
	apiKey: 'AIzaSyCOdUna-uGEVkZAZuo2dhPpcOds5pW_U8c',
	authDomain: 'mon-pere-noel.firebaseapp.com',
	projectId: 'mon-pere-noel',
	storageBucket: 'mon-pere-noel.appspot.com',
	messagingSenderId: '461306839921',
	appId: '1:461306839921:web:b8595f6ab86a21848facd0',
	measurementId: 'G-HSZ9T94CF3',
};

export const environment: Environment = {
	isProduction: false,
	isMock: true,
	apiUrl: 'http://localhost:5000/api',
	apiVersion: 'v1',
	api: {},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
