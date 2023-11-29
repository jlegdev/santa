import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor() {}

	ngOnDestroy() {}

	public isLoggedIn(): Promise<boolean> {
		console.log('');
		return new Promise<boolean>((resolve, reject) => resolve(true));
	}

	public login(): Promise<boolean> {
		console.log('');
		return new Promise<boolean>((resolve, reject) => resolve(true));
	}

	public logout(): Promise<boolean> {
		console.log('');
		return new Promise<boolean>((resolve, reject) => resolve(true));
	}
}
