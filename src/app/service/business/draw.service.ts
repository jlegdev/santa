import { Injectable } from '@angular/core';
import { DrawRelation, DrawResult } from 'src/app/model/draft.model';
import { User } from 'src/app/model/user.model';

@Injectable({
	providedIn: 'root',
})
export class DrawService {
	constructor() {}

	public getReceiverOfUserIdFromDrawResult(userId: string, drawResult: DrawResult): User {
		const relation: DrawRelation | undefined = drawResult.relations.find((relation: DrawRelation) => relation.giver.id == userId);
		if (relation === undefined) {
			throw new Error('BusinessError Draw. Receiver not found. \nUserId: ' + userId + '\nDrawResult: ' + drawResult);
		}
		const user: User = relation.receiver;
		return user;
	}
}
