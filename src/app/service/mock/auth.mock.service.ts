import { Injectable } from '@angular/core';
import { User, UserMock1 } from 'src/app/model/user.model';
import { StorageService } from '../utils/storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthMockService {
	constructor(private storageService: StorageService) {}

	public isLoggedIn(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			const user: User | undefined = this.storageService.getUser();
			if (user) {
				resolve(true);
			} else {
				reject(false);
			}
		});
	}

	public login(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.storageService.storeUser(UserMock1);
			resolve(true);
		});
	}

	public logout(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.storageService.clear();
			resolve(true);
		});
	}
}
