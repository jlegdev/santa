export interface UserModel {
	id: string;
	uid: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture?: string | null;
	eventsId?: string[] | null;
}

export enum UserTrad {
	NAMESPACE = 'user',
	NAMESPACE_CLASS = 'user.class',
	ID = 'id',
	FIRST_NAME = 'firstName',
	LAST_NAME = 'lastName',
	EMAIL = 'email',
	PROFILE_PICTURE = 'profilePicture',
	EVENTS_ID = 'eventsId',
}

export const UserMock1: UserModel = {
	id: '1',
	uid: '2',
	firstName: 'John',
	lastName: 'Doe',
	email: 'doe@example.com',
	profilePicture: null,
	eventsId: ['1'],
};

export const UserMock2: UserModel = {
	id: '2',
	uid: '2',
	firstName: 'Martin',
	lastName: 'Dupont',
	email: 'dupont@example.com',
	profilePicture: null,
	eventsId: ['1'],
};

export const UserMock3: UserModel = {
	id: '3',
	uid: '2',
	firstName: 'Jean',
	lastName: 'Dubois',
	email: 'dupont@example.com',
	profilePicture: null,
	eventsId: ['1'],
};
export const UserMock4: UserModel = {
	id: '4',
	uid: '2',
	firstName: 'Pierre',
	lastName: 'Lefebvre',
	email: 'dupont@example.com',
	profilePicture: null,
	eventsId: ['1'],
};
export const UserMock5: UserModel = {
	id: '5',
	uid: '2',
	firstName: 'Hugo ',
	lastName: 'Moreau',
	email: 'dupont@example.com',
	profilePicture: null,
	eventsId: ['1'],
};
export const UserMock6: UserModel = {
	id: '6',
	uid: '2',
	firstName: 'Pascal',
	lastName: 'Mignot',
	email: 'dupont@example.com',
	profilePicture: null,
	eventsId: ['1'],
};
