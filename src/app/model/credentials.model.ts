export interface Credentials {
	login: string;
	password: string;
}

export const CREDENTIAL: Credentials = {
	login: 'T0000001',
	password: '1234',
};

export enum CredentialTrad {
	NAMESPACE = 'credential',
	NAMESPACE_CLASS = 'credential.class',
	LOGIN = 'login',
	PASSWORD = 'password',
}

export interface CredentialEdit {
	oldPassword: string;
	newPasswordConfirm: string;
	newPassword: string;
}
