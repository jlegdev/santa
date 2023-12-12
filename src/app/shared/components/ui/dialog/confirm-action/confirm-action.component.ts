import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TradService } from 'src/app/service/trad.service';
import { ButtonActionTradEnum } from 'src/app/shared/enum/button-action-trad.enum';

@Component({
	selector: 'app-confirm-action',
	templateUrl: './confirm-action.component.html',
	styleUrls: ['./confirm-action.component.scss'],
})
export class ConfirmActionComponent {
	public title: string;
	public message: string;
	public confirmButtonText: string;
	public cancelButtonText: string;

	public i18nNamespace: string = 'general.dialog.confirm-cancel';
	constructor(
		private dialogRef: MatDialogRef<ConfirmActionComponent>,
		private tradService: TradService,
		@Inject(MAT_DIALOG_DATA) public data: { i18nNamespace: string; action: ButtonActionTradEnum }
	) {
		this.i18nNamespace = data.i18nNamespace;
		this.title = this.tradService.instant('title', this.i18nNamespace);
		this.message = this.tradService.instant('content', this.i18nNamespace);
		this.confirmButtonText = this.tradService.instant(data.action, 'general.button');
		this.cancelButtonText = this.tradService.instant('cancel', 'general.button');
	}

	ngOnInit(): void {}

	public onConfirm(): void {
		this.dialogRef.close(true);
	}

	public onDismiss(): void {
		this.dialogRef.close(false);
	}
}
