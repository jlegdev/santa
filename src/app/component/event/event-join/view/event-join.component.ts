import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { EventTrad } from 'src/app/model/santa-event.model';
import { EventJoinFormService } from 'src/app/service/form/event-join.form.service';

@Component({
	selector: 'app-event-join',
	templateUrl: './event-join.component.html',
	styleUrls: ['./event-join.component.scss'],
})
export class EventJoinComponent implements OnInit {
	@Output()
	public onEmitJoin: EventEmitter<string> = new EventEmitter<string>();
	@Input() public loadingState: LoadingState = LoadingState.INITIAL;

	public form: FormGroup;

	public readonly i18nEvent = EventTrad;
	public readonly i18nNamespace: string = 'event.join';
	public readonly LoadingState = LoadingState;
	constructor(private eventJoinFormService: EventJoinFormService) {
		this.form = this.eventJoinFormService.getForm();
	}
	ngOnInit(): void {}

	public onJoinClick(): void {
		this.form.markAllAsTouched();
		this.form.updateValueAndValidity();
		if (this.form?.invalid) {
			return;
		}
		const token: string = this.form.get(this.i18nEvent.TOKEN)?.value;
		this._emitJoin(token);
	}

	private _emitJoin(eventToken: string): void {
		this.onEmitJoin.emit(eventToken);
	}
}
