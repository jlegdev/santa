import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { Credentials } from 'src/app/model/credentials.model';
import { UserModel } from 'src/app/model/user.model';
import { NotifService } from '../utils/notif.service';
import { RoutingService } from '../utils/routing.service';
import { StorageService } from '../utils/storage.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { IAuthService } from './iauth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService implements IAuthService {
	constructor(
		private notifService: NotifService,
		private storageService: StorageService,
		private routingService: RoutingService,
		private firebaseAuthService: FirebaseAuthService
	) {}

	public register(credential: Credentials): Promise<any> {
		return this.firebaseAuthService.register(credential.login, credential.password).then((value) => console.log(value));
	}

	public isLoggedIn(): Promise<boolean> {
		return new Promise((resolve) => resolve(this.firebaseAuthService.isLoggedIn()));
	}

	public login(credential: Credentials): Observable<boolean> {
		return from(
			this.firebaseAuthService
				.login(credential.login, credential.password)
				.then(() => {
					console.log(this.firebaseAuthService.getCurrentUser());
					// this.storageService.storeUser();
					// this.routingService.navigate(RoutePathEnum.HOME);
					return true;
				})
				.catch((error) => {
					console.log(error);
					return false;
				})
		);
	}

	public logout(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.storageService.clear();
			this.routingService.navigate(RoutePathEnum.LOGIN);
			resolve(true);
		});
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
