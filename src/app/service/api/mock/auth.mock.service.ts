import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { Credentials } from 'src/app/model/credentials.model';
import { User, UserMock1 } from 'src/app/model/user.model';
import { NotifService } from '../../utils/notif.service';
import { RoutingService } from '../../utils/routing.service';
import { StorageService } from '../../utils/storage.service';
import { IAuthService } from '../iauth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthMockService implements IAuthService {
	constructor(private notifService: NotifService, private storageService: StorageService, private routingService: RoutingService) {}

	public isLoggedIn(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			const user: User | undefined = this.storageService.getUser();
			if (user) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	}

	public login(credential: Credentials): Observable<boolean> {
		console.log('yes');
		this.storageService.storeUser(UserMock1);
		this.routingService.navigate(RoutePathEnum.HOME);
		return of(true);
	}

	public logout(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.storageService.clear();
			this.routingService.navigate(RoutePathEnum.LOGIN);
			resolve(true);
		});
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
