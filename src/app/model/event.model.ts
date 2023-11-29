import { EventStatuEnum } from '../enum/event.status.enum';
import { EventTypeEnum } from '../enum/event.type.enum';
import { DrawResult, DrawResult1, DrawResult2 } from './draft.model';
import { User, UserMock1, UserMock2 } from './user.model';

// Modèle pour représenter un événement
export interface SantaEvent {
	id: string;
	type: EventTypeEnum;
	token: string;
	statu: EventStatuEnum;
	dateCreate: Date;
	dateRegisterClose: Date;
	dateEvent: Date;
	participants: User[];
	drawResult: DrawResult[];
}

export enum EventTrad {
	NAMESPACE = 'event',
	NAMESPACE_CLASS = 'event.class',
	DATE_CREATE = 'dateCreate',
	DATE_REGISTER_CLOSE = 'dateRegisterClose',
	DATE_EVENT = 'dateEvent',
	DRAW_RESULT = 'drawResult',
	ID = 'id',
	PARTICIPANTS = 'participants',
	STATU = 'statu',
	TOKEN = 'token',
	TYPE = 'type',
}

export const EventRegisteringMock: SantaEvent = {
	id: '1',
	type: EventTypeEnum.SANTA,
	token: 'ABCD123',
	statu: EventStatuEnum.REGISTERING,
	dateCreate: new Date(),
	dateRegisterClose: new Date(),
	dateEvent: new Date(),
	participants: [UserMock1, UserMock2],
	drawResult: [DrawResult1, DrawResult2],
};

export const EventWaitinggMock: SantaEvent = {
	id: '2',
	type: EventTypeEnum.SANTA,
	token: 'ABCD123',
	statu: EventStatuEnum.WAITING_DRAFT,
	dateCreate: new Date(),
	dateRegisterClose: new Date(),
	dateEvent: new Date(),
	participants: [UserMock1, UserMock2],
	drawResult: [DrawResult1, DrawResult2],
};

export const EventRunningMock: SantaEvent = {
	id: '3',
	type: EventTypeEnum.SANTA,
	token: 'ABCD123',
	statu: EventStatuEnum.RUNNING,
	dateCreate: new Date(),
	dateRegisterClose: new Date(),
	dateEvent: new Date(),
	participants: [UserMock1, UserMock2],
	drawResult: [DrawResult1, DrawResult2],
};
export const EventFinishedMock: SantaEvent = {
	id: '4',
	type: EventTypeEnum.SANTA,
	token: 'ABCD123',
	statu: EventStatuEnum.FINISHED,
	dateCreate: new Date(),
	dateRegisterClose: new Date(),
	dateEvent: new Date(),
	participants: [UserMock1, UserMock2],
	drawResult: [DrawResult1, DrawResult2],
};
