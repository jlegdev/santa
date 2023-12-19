import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventStatuEnum } from 'src/app/enum/event.status.enum';
import { IconEnum } from 'src/app/enum/icon.enum';
import { ImgPathEnum } from 'src/app/enum/img.path.enum';
import { EventTrad, SantaEvent } from 'src/app/model/santa-event.model';

@Component({
	selector: 'app-event-view-card',
	templateUrl: './event-view-card.component.html',
	styleUrls: ['./event-view-card.component.scss'],
})
export class EventViewCardComponent implements OnInit {
	@Input({ required: true })
	public event!: SantaEvent;

	@Output()
	public emitOnViewEvent: EventEmitter<{ id: string; isNewTab: boolean }> = new EventEmitter<{ id: string; isNewTab: boolean }>();

	public readonly i18nNamespace: string = 'event.view-card';
	public readonly i18nEvent = EventTrad;
	public readonly IconEnum = IconEnum;
	public readonly EventStatuEnum = EventStatuEnum;
	public readonly imgSrc: ImgPathEnum;
	constructor() {
		this.imgSrc = ImgPathEnum.SANTA4;
	}

	ngOnInit(): void {}

	public onViewEvent(eventId: string, isNewTab: boolean): void {
		this.emitOnViewEvent.emit({ id: eventId, isNewTab: isNewTab });
	}
}
