export interface User {
	id: string;
	firstName: string;
	lastName: string;
	dateCreate: Date;
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
	DATE_CREATE = 'dateCreate',
	EMAIL = 'email',
	PROFILE_PICTURE = 'profilePicture',
	EVENTS_ID = 'eventsId',
}

export const UserMock1: User = {
	id: '1',
	firstName: 'John',
	lastName: 'Doe',
	dateCreate: new Date(),
	email: 'doe@example.com',
	profilePicture: null,
	eventsId: ['1'],
};

export const UserMock2: User = {
	id: '2',
	firstName: 'Martin',
	lastName: 'Dupont',
	dateCreate: new Date(),
	email: 'dupont@example.com',
	profilePicture: null,
	eventsId: ['1'],
};

export const UserMock3: User = {
	id: '3',
	firstName: 'Jean',
	lastName: 'Dubois',
	dateCreate: new Date(),
	email: 'dupont@example.com',
	profilePicture: null,
	eventsId: ['1'],
};
export const UserMock4: User = {
	id: '4',
	firstName: 'Pierre',
	lastName: 'Lefebvre',
	dateCreate: new Date(),
	email: 'dupont@example.com',
	profilePicture: null,
	eventsId: ['1'],
};
export const UserMock5: User = {
	id: '5',
	firstName: 'Hugo ',
	lastName: 'Moreau',
	dateCreate: new Date(),
	email: 'dupont@example.com',
	profilePicture: null,
	eventsId: ['1'],
};
export const UserMock6: User = {
	id: '6',
	firstName: 'Pascal',
	lastName: 'Mignot',
	dateCreate: new Date(),
	email: 'dupont@example.com',
	profilePicture: null,
	eventsId: ['1'],
};