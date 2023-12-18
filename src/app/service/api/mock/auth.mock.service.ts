import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from 'src/app/model/credentials.model';
import { UserModel } from 'src/app/model/user.model';
import { NotifService } from '../../utils/notif.service';
import { RoutingService } from '../../utils/routing.service';
import { StorageService } from '../../utils/storage.service';
import { IAuthService } from '../iauth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthMockService implements IAuthService {
	constructor(private storageService: StorageService, private router: RoutingService, private notifService: NotifService) {}

	public register(credential: Credentials): any {
		console.log(credential);
	}
	public isLoggedIn(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => resolve(true));
	}

	public login(credential: Credentials): Observable<boolean> {
		return of(true);
	}

	public logout(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => resolve(true));
	}

	public getCurrentUser(): UserModel {
		const user: UserModel | undefined = this.storageService.getUser();
		if (user === undefined) {
			this.logout();
			this.notifService.error('An error occured. Please reconnect. Sorry les gars');
			throw new Error('No user found into storage');
		}
		return user;
	}
}
