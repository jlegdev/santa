export interface Register {
	login: string;
	password: string;
	firstName: string;
	lastName: string;
}
export const REGISTER: Register = {
	login: 'test@test.com',
	password: '1234',
	firstName: 'fezfez',
	lastName: 'fezefez',
};

export enum RegisterTrad {
	NAMESPACE = 'register',
	NAMESPACE_CLASS = 'register.class',
	LOGIN = 'login',
	PASSWORD = 'password',
	FIRST_NAME = 'firstName',
	LAST_NAME = 'lastName',
}

export interface Credentials {
	login: string;
	password: string;
}

export const CREDENTIAL: Credentials = {
	login: 'T0000001',
	password: '1234',
};

export enum CredentialTrad {
	NAMESPACE = 'login',
	NAMESPACE_CLASS = 'login.class',
	LOGIN = 'login',
	PASSWORD = 'password',
}

export interface CredentialEdit {
	oldPassword: string;
	newPasswordConfirm: string;
	newPassword: string;
}
