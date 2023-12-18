import { EventStatuEnum } from '../enum/event.status.enum';
import { EventTypeEnum } from '../enum/event.type.enum';
import { DrawResult, DrawResult1, DrawResult2 } from './draw.model';
import { UserMock1, UserMock2, UserMock3, UserMock4, UserMock5, UserMock6, UserModel } from './user.model';

// Modèle pour représenter un événement
export interface SantaEventBasic {
	title: string;
	description?: string;
	budget: number;
	type: EventTypeEnum;
	statut: EventStatuEnum;
	dateRegisterClose: Date;
	dateEvent: Date;
}

export interface SantaEvent extends SantaEventBasic {
	id: string;
	creator: UserModel;
	token: string;
	dateCreate: Date;
	participants: UserModel[];
	drawResultActive?: DrawResult;
	oldDrawResult?: DrawResult[];
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
	participants: [UserMock1, UserMock2, UserMock3, UserMock4, UserMock5, UserMock6],
	title: 'Santa Registering',
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
	oldDrawResult: [DrawResult1, DrawResult2],
	drawResultActive: DrawResult2,
	title: 'Santa Wainting draw',
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
	oldDrawResult: [DrawResult1, DrawResult2],
	drawResultActive: DrawResult2,
	title: 'Santa Running',
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
	oldDrawResult: [DrawResult1, DrawResult2],
	drawResultActive: DrawResult2,
	title: 'Santa finished',
	description: 'The most famous secret santa',
};
