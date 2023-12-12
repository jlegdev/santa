import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, first, map } from 'rxjs';
import { StringPercentage } from '../model/custom-type';
import { ConfirmActionComponent } from '../shared/components/ui/dialog/confirm-action/confirm-action.component';
import { ButtonActionTradEnum } from '../shared/enum/button-action-trad.enum';
import { ThemeService } from './api/theme.service';

export class DialogConfig {
	height?: StringPercentage;
	width?: StringPercentage;
	disableClose?: boolean;
	data?: object;
	panelClass?: string;
	backdropClass?: string;
}

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	constructor(private dialog: MatDialog, private themeService: ThemeService) {}

	public open<T, R = any>(component: ComponentType<T> | unknown, config?: DialogConfig): MatDialogRef<T, R> {
		if (!config) {
			config = this._getDefaultConfig();
		}
		// here its mandatory for applying current theme to dialog
		// it doesnt take in account the current theme, it uses the default theme
		// to fix when we will implemented dark mode
		config.panelClass = this.themeService.DEFAULT_THEME;
		return this.dialog.open(component as ComponentType<any>, config);
	}

	public closeAll(): void {
		this.dialog.closeAll();
	}

	private _getDefaultConfig(): DialogConfig {
		let config: DialogConfig = new DialogConfig();
		config.disableClose = true;
		config.backdropClass = this.themeService.DEFAULT_THEME;
		config.panelClass = this.themeService.DEFAULT_THEME;
		return config;
	}

	public openConfirmActionDialog(i18nNamespace: string, action: ButtonActionTradEnum): Observable<boolean> {
		const config: DialogConfig = new DialogConfig();
		config.data = { i18nNamespace: i18nNamespace, action: action };
		let t = this.open(ConfirmActionComponent, config);

		return t.afterClosed().pipe(
			first(),
			map((value: boolean) => value)
		);
	}
}
