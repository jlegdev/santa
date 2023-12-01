import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SantaEvent } from 'src/app/model/santa-event.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	@Input({ required: true })
	public userName: string = '';
	@Input({ required: true })
	public events: Array<SantaEvent> = [];

	@Output()
	public emitOnCreateEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output()
	public emitOnJoinEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

	public readonly i18nHome: string = 'home';
	constructor() {}

	ngOnInit(): void {}

	public onJoinEvent(): void {
		this.emitOnJoinEvent.emit(true);
	}

	public onCreateEvent(): void {
		this.emitOnCreateEvent.emit(true);
	}

	public trackEvent(index: number, element: SantaEvent): string {
		return element.id;
	}
}
