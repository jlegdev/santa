import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IconEnum } from 'src/app/enum/icon.enum';

@Component({
	selector: 'app-menu-user',
	templateUrl: './menu-user.component.html',
	styleUrls: ['./menu-user.component.scss'],
})
export class MenuUserComponent implements OnInit {
	@Output()
	private emitLogout: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output()
	private emitUserAccount: EventEmitter<boolean> = new EventEmitter<boolean>();
	public readonly IconEnum = IconEnum;
	constructor() {}

	ngOnInit() {}

	public onLogout(): void {
		this.emitLogout.emit(true);
	}

	public onUserAccount(): void {
		this.emitUserAccount.emit(true);
	}
}
