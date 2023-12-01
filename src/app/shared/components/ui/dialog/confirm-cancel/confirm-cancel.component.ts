import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TradService } from 'src/app/shared/service/trad.service';

@Component({
	selector: 'app-confirm-cancel',
	templateUrl: './confirm-cancel.component.html',
	styleUrls: ['./confirm-cancel.component.scss'],
})
export class ConfirmCancelComponent implements OnInit {
	public title: string;
	public message: string;
	public confirmButtonText: string;
	public cancelButtonText: string;

	public i18nNamespace: string = 'general.dialog.confirm-cancel';
	constructor(
		private dialogRef: MatDialogRef<ConfirmCancelComponent>,
		private tradService: TradService,
		@Inject(MAT_DIALOG_DATA) public data: { i18nNamespace: string }
	) {
		this.title = this.tradService.instant('title', this.i18nNamespace);
		this.message = this.tradService.instant('content', this.i18nNamespace);
		this.confirmButtonText = this.tradService.instant('validate', 'general.button');
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
