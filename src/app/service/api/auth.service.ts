import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Credentials } from 'src/app/model/credentials.model';
import { User } from 'src/app/model/user.model';
import { NotifService } from '../utils/notif.service';
import { RoutingService } from '../utils/routing.service';
import { StorageService } from '../utils/storage.service';
import { IAuthService } from './iauth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService implements IAuthService {
	constructor(private storageService: StorageService, private router: RoutingService, private notifService: NotifService) {}

	ngOnDestroy() {}

	public isLoggedIn(): Promise<boolean> {
		console.log('');
		return new Promise<boolean>((resolve, reject) => resolve(true));
	}

	public login(credential: Credentials): Observable<boolean> {
		console.log('auth service');
		return of(true);
	}

	public logout(): Promise<boolean> {
		console.log('');
		return new Promise<boolean>((resolve, reject) => resolve(true));
	}

	public getCurrentUser(): User {
		const user: User | undefined = this.storageService.getUser();
		if (user === undefined) {
			this.logout();
			this.notifService.error('An error occured. Please reconnect. Sorry les gars');
			throw new Error('No user found into storage');
		}
		return user;
	}
}
