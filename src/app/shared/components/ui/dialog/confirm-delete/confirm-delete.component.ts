import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-confirm-delete',
	templateUrl: './confirm-delete.component.html',
	styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent {
	public title: string = 'Confirm Action';
	public message: string = 'Are you sure?';
	public confirmButtonText = 'Yes';
	public cancelButtonText = 'Cancel';

	constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ConfirmDeleteComponent>) {
		if (data) {
			this.title = data.title || this.title;
			this.message = data.message || this.message;
			if (data.buttonText) {
				this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
				this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
			}
		}
	}

	public onConfirmClick(): void {
		this.dialogRef.close(true);
	}

	public onDismiss(): void {
		this.dialogRef.close(false);
	}
}
