import { UserMock1, UserMock2, UserModel } from './user.model';

export interface DrawResult {
	isActive: boolean;
	dateDraft: Date;
	relations: DrawRelation[];
}

export enum DrawResultTrad {
	NAMESPACE = 'drawResult',
	NAMESPACE_CLASS = 'drawResult.class',
	IS_ACTIVE = 'isActive',
	DATE_DRAFT = 'dateDraft',
	RELATIONS = 'relations',
}

export interface DrawRelation {
	giver: UserModel;
	receiver: UserModel;
}

export const DrawRelationMock1: DrawRelation = {
	giver: UserMock1,
	receiver: UserMock2,
};
export const DrawRelationMock2: DrawRelation = {
	giver: UserMock2,
	receiver: UserMock1,
};

export const DrawResult1: DrawResult = {
	isActive: true,
	dateDraft: new Date(),
	relations: [DrawRelationMock1, DrawRelationMock2],
};

export const DrawResult2: DrawResult = {
	isActive: false,
	dateDraft: new Date(),
	relations: [DrawRelationMock1, DrawRelationMock2],
};
