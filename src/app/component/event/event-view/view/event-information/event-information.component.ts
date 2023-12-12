import { Component, Input, OnInit } from '@angular/core';
import { EventTrad, SantaEvent } from 'src/app/model/santa-event.model';

@Component({
	selector: 'app-event-information',
	templateUrl: './event-information.component.html',
	styleUrls: ['./event-information.component.scss'],
})
export class EventInformationComponent implements OnInit {
	@Input() public event!: SantaEvent;

	public readonly i18nEvent = EventTrad;

	constructor() {}

	ngOnInit(): void {}
}
