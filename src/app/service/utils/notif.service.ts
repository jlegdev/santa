import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class NotifService {
	constructor(private snackBar: MatSnackBar) {}

	public notif(message: string, actionClose: string = 'Close', duration: number = 5000): void {
		const options: MatSnackBarConfig = {};
		options.duration = duration;
		options.panelClass = 'notif-general';
		this._displayNotif(message, actionClose, options);
	}

	public success(message: string, actionClose: string = 'Close', duration: number = 5000): void {
		const options: MatSnackBarConfig = {};
		options.duration = duration;
		options.panelClass = 'notif-success';
		this._displayNotif(message, actionClose, options);
	}

	public error(message: string, actionClose: string = 'Close', duration: number = 5000): void {
		const options: MatSnackBarConfig = {};
		options.duration = duration;
		options.panelClass = 'notif-error';
		this._displayNotif(message, actionClose, options);
	}

	private _displayNotif(message: string, actionClose: string = 'Close', options: MatSnackBarConfig): void {
		this.snackBar.open(message, actionClose, options);
	}


	public notifWithTitle(title: string, message: string, actionClose: string = 'Close', duration: number = 5000): void {
		const options: MatSnackBarConfig = {};
		options.duration = duration;
		options.panelClass = 'notif-general';
		this._displayNotifWithTitle(title,message, actionClose, options);
	}

	public successWithTitle(title: string, message: string, actionClose: string = 'Close', duration: number = 5000): void {
		const options: MatSnackBarConfig = {};
		options.duration = duration;
		options.panelClass = 'notif-success';
		this._displayNotifWithTitle(title, message, actionClose, options);
	}

	public errorWithTitle(title: string, message: string, actionClose: string = 'Close', duration: number = 5000): void {
		const options: MatSnackBarConfig = {};
		options.duration = duration;
		options.panelClass = 'notif-error';
		this._displayNotifWithTitle(title, message, actionClose, options);
	}

	private _displayNotifWithTitle(title: string, message: string, actionClose: string = 'Close', options: MatSnackBarConfig): void {
		this.snackBar.open(message, actionClose, options);
	}
}
