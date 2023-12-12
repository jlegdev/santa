import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventStatuEnum } from 'src/app/enum/event.status.enum';
import { EventTypeEnum } from 'src/app/enum/event.type.enum';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { EventTrad, SantaEventBasic } from 'src/app/model/santa-event.model';
import { EventNewFormService } from 'src/app/service/form/event-new.form.service';

@Component({
	selector: 'app-event-create-view',
	templateUrl: './event-create-view.component.html',
	styleUrls: ['./event-create-view.component.scss'],
})
export class EventCreateViewComponent implements OnInit {
	@Output()
	public onEmitCreate: EventEmitter<SantaEventBasic> = new EventEmitter<SantaEventBasic>();
	@Input() public loadingState: LoadingState = LoadingState.INITIAL;

	public form: FormGroup;

	public readonly i18nEvent = EventTrad;
	public readonly i18nNamespace: string = 'event.new';
	public readonly LoadingState = LoadingState;
	constructor(private eventNewFormService: EventNewFormService) {
		this.form = this.eventNewFormService.getForm();
	}
	ngOnInit(): void {}

	public onCreateClick(): void {
		this.form.markAllAsTouched();
		this.form.updateValueAndValidity();
		if (this.form?.invalid) {
			return;
		}
		const formValue = { ...(this.form.value as Omit<SantaEventBasic, 'statut' | 'type'>) };
		const santaEventBasic: SantaEventBasic = { ...formValue, statut: EventStatuEnum.REGISTERING, type: EventTypeEnum.SANTA };
		this._emitCreate(santaEventBasic);
	}

	private _emitCreate(santaEvent: SantaEventBasic): void {
		this.onEmitCreate.emit(santaEvent);
	}
}
