import { Injectable } from '@angular/core';
import { Observable, concatMap, forkJoin, from, map, switchMap } from 'rxjs';
import { EventStatuEnum } from 'src/app/enum/event.status.enum';
import { SantaEvent, SantaEventBasic } from 'src/app/model/santa-event.model';
import { UserModel } from 'src/app/model/user.model';
import { DocumentNotFoundError } from 'src/app/shared/error/api.error';
import { UserIsAlreadyParticipatingError } from 'src/app/shared/error/business.error';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class EventService {
	private _apiUrl: string = 'events';
	constructor(private authService: AuthService, private firebaseService: FirebaseService, private userService: UserService) {}

	public getOneEvent(id: string): Observable<SantaEvent> {
		const events$: Observable<SantaEvent> = this.firebaseService.getOne<SantaEvent>(this._apiUrl, id);
		return events$;
	}

	public getOneEventByToken(eventToken: string): Observable<SantaEvent> {
		console.log("on cherche l'event au token ");
		console.log(eventToken);
		return this.getEvents().pipe(
			map((events: SantaEvent[]) => {
				console.log('les events', events);
				console.log('le token', eventToken);
				const event: SantaEvent | undefined = events.find((event: SantaEvent) => event.token == eventToken);
				if (event) {
					return event;
				} else {
					throw new DocumentNotFoundError('No event with this token');
				}
			})
		);
	}

	public getEvents(): Observable<SantaEvent[]> {
		const events$: Observable<SantaEvent[]> = this.firebaseService.getAll<SantaEvent>(this._apiUrl);
		return events$;
	}

	public getEventsOfUser(user: UserModel): Observable<SantaEvent[]> {
		console.log('get event of user function service');

		const events: Observable<SantaEvent>[] = [];
		user.eventsId?.forEach((eventId: string) => {
			events.push(this.getOneEvent(eventId));
		});
		if (events.length > 0) {
			return forkJoin(events);
		} else {
			return from([]);
		}
	}

	public createEvent(event: SantaEventBasic): Observable<string> {
		// get documents (data) from the collection using collectionData
		const token: string = this._generateEventToken();
		const currentUser: UserModel = this.authService.getCurrentUser();
		const eventWithMoreInformation: Partial<SantaEvent> = {
			...event,
			creator: currentUser,
			dateCreate: new Date(),
			participants: [currentUser],
			token: token,
			statut: EventStatuEnum.REGISTERING,
		};

		return this.firebaseService.create(this._apiUrl, eventWithMoreInformation).pipe(
			switchMap((eventId: string) => {
				const eventCreatedWithId: Partial<SantaEvent> = { ...eventWithMoreInformation, id: eventId };
        return this.updateEvent(eventCreatedWithId,eventId).pipe(concatMap((result:void)=>{
let user: UserModel = { ...this.authService.getCurrentUser() };
				if (!user.eventsId) {
					user.eventsId = [eventId];
				} else {
					user.eventsId.push(eventId);
				}
				console.log('event created the user associated is the next, we will update it for adding event id');
				console.log(user);
				return this.userService.updateUser(user, user.id).pipe(map(() => eventId));
        }))

			})
		);
	}

	public updateEvent(event: Partial<SantaEvent>, eventId: string): Observable<void> {
		return this.firebaseService.update(this._apiUrl, eventId, event);
	}

	public deleteEvent(eventId: string): Observable<void> {
		return this.firebaseService.delete(this._apiUrl, eventId);
	}

	public joinEvent(eventToken: string): Observable<string> {
		return this.getOneEventByToken(eventToken).pipe(
			concatMap((event: SantaEvent) => {
				console.log("l'event au token est ");
				console.log(event);
				const currentUser: UserModel = { ...this.authService.getCurrentUser() };
				const userIsAlreadyParticipatingError: boolean = event.participants.some((participant: UserModel) => participant.id == currentUser.id);
				if (userIsAlreadyParticipatingError) {
					throw new UserIsAlreadyParticipatingError('User is already participating');
				} else {
					console.log('join event function');
					if (!currentUser.eventsId) {
						currentUser.eventsId = [event.id];
					} else {
						currentUser.eventsId.push(event.id);
					}

					console.log('current user');
					return this.userService.updateUser(currentUser, currentUser.id).pipe(
						concatMap((result: void) => {
							event.participants.push(currentUser);
							return this.updateEvent(event, event.id).pipe(map((result: void) => event.id));
						})
					);
				}
			})
		);
	}

	private _generateEventToken(): string {
		const tokenLenght: number = 12;
		const timestamp: string = Date.now().toString(36);
		const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const randomString: string = Array.from(crypto.getRandomValues(new Uint8Array(tokenLenght)))
			.map((value) => characters[value % characters.length])
			.join('');

		return timestamp + randomString;
	}
}
