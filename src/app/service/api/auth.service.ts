import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable, concatMap, from, map, of, switchMap } from 'rxjs';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { Credentials, Register } from 'src/app/model/credentials.model';
import { UserModel } from 'src/app/model/user.model';
import { NotifService } from '../utils/notif.service';
import { RoutingService } from '../utils/routing.service';
import { StorageService } from '../utils/storage.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { IAuthService } from './iauth.service';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService implements IAuthService {
	constructor(
		private notifService: NotifService,
		private storageService: StorageService,
		private routingService: RoutingService,
		private firebaseAuthService: FirebaseAuthService,
		private userService: UserService
	) {}

	public register(register: Register): Observable<boolean> {
		const isRegistered$: Observable<boolean> = from(
			this.firebaseAuthService.register(register.login, register.password, register.firstName, register.lastName)
		);
		const userCreated$: Observable<boolean> = isRegistered$.pipe(
			switchMap((isRegistered: boolean) => {
				if (isRegistered) {
					const currentUser: User | null = this.firebaseAuthService.getCurrentUser();
					if (currentUser) {
						const userModel: Omit<UserModel, 'id'> = {
							email: register.login,
							firstName: register.firstName,
							lastName: register.lastName,
							uid: currentUser.uid,
						};
						return this.userService.createUser(userModel).pipe(
							concatMap((userId: string) => {
								return this.userService.getOneUser(userId).pipe(
									map((userJustCreated: UserModel) => {
										this.storageService.storeUser(userJustCreated);
										return true;
									})
								);
							})
						);
					} else {
						throw new Error('Error contact administerato');
					}
				} else {
					return of(isRegistered);
				}
			})
		);
		return userCreated$;
	}

	public isLoggedIn(): Promise<boolean> {
		return new Promise((resolve) => resolve(this.firebaseAuthService.isLoggedIn()));
	}

	public login(credential: Credentials): Observable<boolean> {
		const isLogin$: Observable<boolean> = from(this.firebaseAuthService.login(credential.login, credential.password));

		return isLogin$.pipe(
			switchMap((isLogin: boolean) => {
				if (isLogin) {
					const currentUser: User | null = this.firebaseAuthService.getCurrentUser();
					console.log('on est bien log c le current user : ');
					console.log(currentUser);
					if (currentUser) {
						return this.userService.getUserByuuid(currentUser.uid).pipe(
							map((userJustCreated: UserModel) => {
								console.log(' on a recup en bd ce user');
								console.log(userJustCreated);
								this.storageService.storeUser(userJustCreated);
								return true;
							})
						);
					} else {
						throw new Error('Error contact administrator');
					}
				} else {
					return of(false);
				}
			})
		);
	}

	public logout(): Observable<any> {
		return from(
			this.firebaseAuthService.logout().then(() => {
				this.storageService.clear();
				this.routingService.navigate(RoutePathEnum.LOGIN);
			})
		);
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
