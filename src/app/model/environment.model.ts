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
}
