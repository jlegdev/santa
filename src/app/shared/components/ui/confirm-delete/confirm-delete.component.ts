import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TradService } from 'src/app/shared/service/trad.service';

@Component({
	selector: 'app-confirm-delete',
	templateUrl: './confirm-delete.component.html',
	styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit {
	// @Input()
	public title: string;
	@Input()
	public message: string;
	// @Input()
	public confirmButtonText: string;
	// @Input()
	public cancelButtonText: string;

	@Input()
	public isDisabled: boolean;
	@Input()
	public isLoading: boolean;

	@Output()
	public emitSaveClick: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output()
	public emitCloseClick: EventEmitter<boolean> = new EventEmitter<boolean>();
	constructor(private tradService: TradService) {}

	ngOnInit() {
		this.title = this.tradService.instant('title', 'dialog.confirm-delete');
		this.confirmButtonText = this.tradService.instant('confirm.delete', 'general.button');
		this.cancelButtonText = this.tradService.instant('cancel.delete', 'general.button');
	}

	public onConfirmClick(): void {
		this.emitSaveClick.emit(true);
	}

	public onClose(): void {
		this.emitCloseClick.emit(true);
	}
}
