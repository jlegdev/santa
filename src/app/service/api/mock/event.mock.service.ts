import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventFinishedMock, EventRegisteringMock, EventRunningMock, EventWaitinggMock, SantaEvent } from 'src/app/model/santa-event.model';

@Injectable({
	providedIn: 'root',
})
export class EventMockService {
	constructor() {}

	public getOneEvent(id: string): Observable<SantaEvent> {
		return of(EventRunningMock);
	}

	public getEvents(): Observable<SantaEvent[]> {
		return of([
			EventRegisteringMock,
			EventWaitinggMock,
			EventRunningMock,
			EventFinishedMock,
			EventRunningMock,
			EventFinishedMock,
			EventRegisteringMock,
			EventWaitinggMock,
		]);
	}

	public createEvent(event: SantaEvent): Observable<string> {
		return of(event.id);
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
}
