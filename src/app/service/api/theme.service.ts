import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum ThemeEnum {
	DARK_THEME = 'dark-theme',
	DEFAULT_THEME = 'default-theme',
}
@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	public readonly DEFAULT_THEME: ThemeEnum = ThemeEnum.DEFAULT_THEME;
	private _currentTheme = new Subject<ThemeEnum>();
	public $currentTheme: Observable<ThemeEnum> = this._currentTheme.asObservable();

	constructor() {}

	public setNewTheme(newTheme: ThemeEnum): void {
		this._currentTheme.next(newTheme);
	}
}
