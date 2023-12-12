// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from 'src/app/model/environment.model';

export const environment: Environment = {
	isProduction: false,
	isMock: true,
	apiUrl: 'http://localhost:5000/api',
	apiVersion: 'v1',
	api: {
		algoVersion: {
			url: 'algo_versions',
		},
		flight: {
			url: 'flights',
			getAllFuselages: 'flights/fuselages',
			getOrigins: 'flights/origins',
			getVersions: 'flights/versions',
			getDroneTypes: 'flights/drone_types',
			getCharacteristics: 'flights/characteristics',
			addTags: 'flights/{id}/tags',
			addTagsToFlights: 'flights/tags/add',
			removeTagsToFlights: 'flights/tags/remove',
			getDataFromFlights: 'flights/get-data-from-flights',
			exportDataFromFlights: 'flights/get-data-from-flights/export',
		},
		tag: {
			url: 'tags',
			oneTag: 'tags/{id}',
			getCharacteristicOfOne: 'tags/{id}/characteristics',
			byGroup: 'tags/{id}',
		},
		authentication: {
			url: 'token',
		},
		role: {
			url: 'roles',
			oneRole: 'roles/{id}',
		},
		token: {
			refreshToken: 'refresh-token/',
			deleteToken: 'logout/',
		},
		user: {
			url: 'user',
			oneUser: 'user/{id}',
			getAll: 'users',
			updateCredential: '/user/{id}/update-credential',
			updateOwn: 'user/edit-own/{id}',
		},
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
