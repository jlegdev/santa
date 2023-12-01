import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class RoutingService {
	constructor(private router: Router) {}

	public navigate(url: string, isNewTab: boolean = false, data?: object): void {
		if (isNewTab) {
			this._navigateNewTab(url, data);
		} else {
			this._navigateCurrentTab(url, data);
		}
	}

	private _navigateCurrentTab(url: string, data?: object): void {
		this.router.navigateByUrl(url, data);
	}

	private _navigateNewTab(url: string, data?: object): void {
		window.open(url, '_blank')?.focus();
	}
}
