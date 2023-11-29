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
  dateCreate:new Date(),
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
