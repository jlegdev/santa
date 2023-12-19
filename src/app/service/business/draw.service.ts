import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventStatuEnum } from 'src/app/enum/event.status.enum';
import { DrawRelation, DrawResult } from 'src/app/model/draw.model';
import { SantaEvent } from 'src/app/model/santa-event.model';
import { UserModel } from 'src/app/model/user.model';
import { EventService } from '../api/event.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
	providedIn: 'root',
})
export class DrawService {
	constructor(private utilsService: UtilsService, private eventService: EventService) {}

	public getReceiverOfUserIdFromDrawResult(userId: string, drawResult: DrawResult): UserModel {
		const relation: DrawRelation | undefined = drawResult.relations.find((relation: DrawRelation) => relation.giver.id == userId);
		if (relation === undefined) {
			throw new Error('BusinessError Draw. Receiver not found. \nUserId: ' + userId + '\nDrawResult: ' + drawResult);
		}
		const user: UserModel = relation.receiver;
		return user;
	}
	public createDrawRelations(event: SantaEvent): DrawRelation[] {
		const ids: string[] = event.participants.map((user: UserModel) => user.id);
		const shuffledIds = [...ids]; // Copie du tableau des IDs
		let validDraw = false;
		let drawMap = new Map<string, string>();

		while (!validDraw) {
			shuffledIds.sort(() => Math.random() - 0.5); // Mélange aléatoire des IDs

			validDraw = true;
			drawMap.clear();

			for (let i = 0; i < shuffledIds.length; i++) {
				if (shuffledIds[i] === ids[i]) {
					validDraw = false; // Assure qu'un ID ne tire pas lui-même
					break;
				}
				drawMap.set(ids[i], shuffledIds[i]);
			}
		}
		const drawRelations: DrawRelation[] = [];
		Array.from(drawMap.entries()).forEach((value: [string, string]) => {
			const idGiver: string = value[0];
			const giver: UserModel = event.participants.find((user: UserModel) => user.id == idGiver) as UserModel;
			const idReceiver: string = value[1];
			const receiver: UserModel = event.participants.find((user: UserModel) => user.id == idReceiver) as UserModel;
			const relation: DrawRelation = { giver: giver, receiver: receiver };
			drawRelations.push(relation);
		});
		return drawRelations;
	}

	public launchDraft(event: SantaEvent): Observable<void> {
		const drawRelations: DrawRelation[] = this.createDrawRelations(event);
		const drawResult: DrawResult = { isActive: true, dateDraft: new Date(), relations: drawRelations };
		event.drawResultActive = drawResult;
		event.statut = EventStatuEnum.RUNNING;
		return this.eventService.updateEvent(event, event.id);
	}
}
