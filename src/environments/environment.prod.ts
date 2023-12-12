import { EnvironmentProd, FirebaseConfig } from 'src/app/model/environment.model';

const firebaseConfig: FirebaseConfig = {
	apiKey: 'AIzaSyCOdUna-uGEVkZAZuo2dhPpcOds5pW_U8c',
	authDomain: 'mon-pere-noel.firebaseapp.com',
	projectId: 'mon-pere-noel',
	storageBucket: 'mon-pere-noel.appspot.com',
	messagingSenderId: '461306839921',
	appId: '1:461306839921:web:b8595f6ab86a21848facd0',
	measurementId: 'G-HSZ9T94CF3',
};

export const environment: EnvironmentProd = {
	isProduction: true,
	isMock: true,
	apiUrl: 'test',
	apiVersion: 'v1',
	firebase: firebaseConfig,
};
