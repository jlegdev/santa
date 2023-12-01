import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-cancel-button',
	templateUrl: './cancel-button.component.html',
	styleUrls: ['./cancel-button.component.scss'],
})
export class CancelButtonComponent implements OnInit {
	@Input()
	public text: string;

	@Input()
	public isDisabled: boolean = false;

	@Input()
	public isLoading: boolean = false;

	@Output()
	public emitClick: EventEmitter<boolean> = new EventEmitter<boolean>();
	constructor() {}

	ngOnInit(): void {}

	public onClick(): void {
		this.emitClick.emit(true);
	}
}
