import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SantaEvent } from 'src/app/model/santa-event.model';
import { EventService } from 'src/app/service/api/event.service';

@Component({
	selector: 'app-event-view-container',
	templateUrl: './event-view-container.component.html',
	styleUrls: ['./event-view-container.component.scss'],
})
export class EventViewContainerComponent implements OnInit {
	private idEvent: string;
	public event$: Observable<SantaEvent>;

	constructor(private route: ActivatedRoute, private eventService: EventService) {
		this.idEvent = this.route.snapshot.paramMap.get('id') ?? '';
		this.event$ = this.eventService.getOneEvent(this.idEvent);
	}

	ngOnInit(): void {}
}
