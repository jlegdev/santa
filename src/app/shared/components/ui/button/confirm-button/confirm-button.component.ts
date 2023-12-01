import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-confirm-button',
	templateUrl: './confirm-button.component.html',
	styleUrls: ['./confirm-button.component.scss'],
})
export class ConfirmButtonComponent implements OnInit {
	@Input()
	public text!: string;

	@Input()
	public isDisabled: boolean = false;

	@Input()
	public isLoading: boolean = false;
	@Output()
	public emitClick: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output()
	public emitKeyUpEnter: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor() {}

	ngOnInit(): void {}

	public onClick(): void {
		this.emitClick.emit(true);
	}

	public onKeyUpEnter(): void {
		this.emitKeyUpEnter.emit(true);
	}
}
