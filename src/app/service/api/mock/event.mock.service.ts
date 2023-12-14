import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import {
	EventFinishedMock,
	EventRegisteringMock,
	EventRunningMock,
	EventWaitinggMock,
	SantaEvent,
	SantaEventBasic,
} from 'src/app/model/santa-event.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../auth.service';
@Injectable({
	providedIn: 'root',
})
export class EventMockService {
	private _eventsCollection: CollectionReference<DocumentData, DocumentData>;
	constructor(private firestore: Firestore, private authService: AuthService) {
		this._eventsCollection = collection(this.firestore, 'events');
	}

	public getOneEvent(id: string): Observable<SantaEvent> {
		return of(
			[EventRegisteringMock, EventWaitinggMock, EventRunningMock, EventFinishedMock].find((event: SantaEvent) => event.id == id) ??
				EventRegisteringMock
		);
	}

	// public getEvents(): Observable<SantaEvent[]> {
	// 	return of([
	// 		EventRegisteringMock,
	// 		EventWaitinggMock,
	// 		EventRunningMock,
	// 		EventFinishedMock,
	// 		EventRunningMock,
	// 		EventFinishedMock,
	// 		EventRegisteringMock,
	// 		EventWaitinggMock,
	// 	]);
	// }
	public getEvents(): Observable<SantaEvent[]> {
		// get documents (data) from the collection using collectionData
		const events$: Observable<SantaEvent[]> = collectionData(this._eventsCollection) as Observable<SantaEvent[]>;
		return events$;
	}
	public createEvent(event: SantaEventBasic): Observable<string> {
		const token: string = this._generateEventToken();
		const currentUser: User = this.authService.getCurrentUser();
		const eventWithMoreInformation: Partial<SantaEvent> = { ...event, creator: currentUser, dateCreate: new Date(), participants: [], token: token };
		return from(addDoc(this._eventsCollection, eventWithMoreInformation).then((documentReference: DocumentReference) => documentReference.id));
	}

	public updateEvent(event: Partial<SantaEvent>, eventId: string): Observable<string> {
		return of(eventId);
	}

	public deleteEvent(eventId: string): Observable<string> {
		return of(eventId);
	}

	public joinEvent(eventToken: string): Observable<SantaEvent> {
		return of(EventRegisteringMock);
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
