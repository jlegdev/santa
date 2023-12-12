export interface Environment {
	isProduction: boolean;
	isMock: boolean;
	apiUrl: string;
	apiVersion: string;
	api?: {
		[key: string]: {
			[key: string]: string;
		};
	};
	firebase?: FirebaseConfig;
}

export interface EnvironmentProd extends Environment {
	firebase: FirebaseConfig;
}

export interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
}
