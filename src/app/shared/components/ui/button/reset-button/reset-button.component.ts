import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconEnum } from 'src/app/shared/enum/icon.enum';

@Component({
	selector: 'app-reset-button',
	templateUrl: './reset-button.component.html',
	styleUrls: ['./reset-button.component.scss'],
})
export class ResetButtonComponent implements OnInit {
	@Input()
	public text: string = 'Reset';

	@Input()
	public isDisabled: boolean = false;

	@Input()
	public isLoading: boolean = false;
	@Output()
	public emitClick: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output()
	public emitKeyUpEnter: EventEmitter<boolean> = new EventEmitter<boolean>();

	public readonly IconEnum = IconEnum;
	constructor() {}

	ngOnInit(): void {}

	public onClick(): void {
		this.emitClick.emit(true);
	}
}
