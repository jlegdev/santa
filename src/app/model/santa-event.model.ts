import { EventStatuEnum } from '../enum/event.status.enum';
import { EventTypeEnum } from '../enum/event.type.enum';
import { DrawResult, DrawResult1, DrawResult2 } from './draft.model';
import { User, UserMock1, UserMock2 } from './user.model';

// Modèle pour représenter un événement
export interface SantaEvent {
	id: string;
	creator: User;
	title: string;
	description?: string;
	budget: number;
	type: EventTypeEnum;
	token: string;
	statut: EventStatuEnum;
	dateCreate: Date;
	dateRegisterClose: Date;
	dateEvent: Date;
	participants: User[];
	drawResultActive: DrawResult;
	drawResult: DrawResult[];
}

export enum EventTrad {
	NAMESPACE = 'event',
	NAMESPACE_CLASS = 'event.class',
	DATE_CREATE = 'dateCreate',
	DATE_REGISTER_CLOSE = 'dateRegisterClose',
	DATE_EVENT = 'dateEvent',
	DESCRIPTION = 'description',
	DRAW_RESULT = 'drawResult',
	BUDGET = 'budget',
	CREATOR = 'creator',
	ID = 'id',
	PARTICIPANTS = 'participants',
	STATU = 'statu',
	TOKEN = 'token',
	TYPE = 'type',
	TITLE = 'title',
}

export const EventRegisteringMock: SantaEvent = {
	id: '1',
	type: EventTypeEnum.SANTA,
	token: 'ABCD123',
	creator: UserMock1,
	statut: EventStatuEnum.REGISTERING,
	budget: 30,
	dateCreate: new Date(),
	dateRegisterClose: new Date(),
	dateEvent: new Date(),
	participants: [UserMock1, UserMock2, UserMock1, UserMock2],
	drawResultActive: DrawResult2,
	drawResult: [DrawResult1, DrawResult2],
	title: 'My Santa',
	description:
		'The most famous secret santa he most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santahe most famous secret santa',
};

export const EventWaitinggMock: SantaEvent = {
	id: '2',
	type: EventTypeEnum.SANTA,
	token: 'ABCD123',
	creator: UserMock1,
	statut: EventStatuEnum.WAITING_DRAFT,
	budget: 30,
	dateCreate: new Date(),
	dateRegisterClose: new Date(),
	dateEvent: new Date(),
	participants: [UserMock1, UserMock2],
	drawResult: [DrawResult1, DrawResult2],
	drawResultActive: DrawResult2,
	title: 'My Santa',
	description: 'The most famous secret santa',
};

export const EventRunningMock: SantaEvent = {
	id: '3',
	type: EventTypeEnum.SANTA,
	token: 'ABCD123',
	creator: UserMock1,
	statut: EventStatuEnum.RUNNING,
	budget: 30,
	dateCreate: new Date(),
	dateRegisterClose: new Date(),
	dateEvent: new Date(),
	participants: [UserMock1, UserMock2, UserMock1, UserMock2, UserMock1, UserMock2, UserMock1],
	drawResult: [DrawResult1, DrawResult2],
	drawResultActive: DrawResult2,
	title: 'My Santa',
	description: 'The most famous secret santa',
};
export const EventFinishedMock: SantaEvent = {
	id: '4',
	type: EventTypeEnum.SANTA,
	token: 'ABCD123',
	creator: UserMock1,
	statut: EventStatuEnum.FINISHED,
	budget: 30,
	dateCreate: new Date(),
	dateRegisterClose: new Date(),
	dateEvent: new Date(),
	participants: [UserMock1, UserMock2],
	drawResult: [DrawResult1, DrawResult2],
	drawResultActive: DrawResult2,
	title: 'My Santa',
	description: 'The most famous secret santa',
};
