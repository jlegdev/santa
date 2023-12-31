import { Injectable } from '@angular/core';
import { Observable, concatMap, map } from 'rxjs';
import { UserModel } from 'src/app/model/user.model';
import { DocumentNotFoundError } from 'src/app/shared/error/api.error';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private _apiUrl: string = 'users';
	constructor(private firebaseService: FirebaseService, private authService: AuthService) {}

	public getOneUser(id: string): Observable<UserModel> {
		const user$: Observable<UserModel> = this.firebaseService.getOne<UserModel>(this._apiUrl, id);
		return user$;
	}

	public getUserByuuid(uid: string): Observable<UserModel> {
		return this.getUsers().pipe(
			map((users: UserModel[]) => {
				const user: UserModel | undefined = users.find((user: UserModel) => user.uid == uid);
				if (user) {
					return user;
				} else {
					throw new DocumentNotFoundError('not found user');
				}
			})
		);
	}
	public getUsers(): Observable<UserModel[]> {
		const users$: Observable<UserModel[]> = this.firebaseService.getAll<UserModel>(this._apiUrl);
		return users$;
	}

	public createUser(user: Omit<UserModel, 'id'>): Observable<string> {
		return this.firebaseService.create(this._apiUrl, user).pipe(
			concatMap((userId: string) => {
				const userWithId: UserModel = { ...user, id: userId };
				return this.updateUser(userWithId, userId).pipe(map((result: void) => userId));
			})
		);
	}

	public updateUser(user: Partial<UserModel>, userId: string): Observable<void> {
		console.log('update function we will update the id ' + userId);
		console.log('the new valeu is ', user);
		return this.firebaseService.update(this._apiUrl, userId, user);
	}

	public deleteUser(userId: string): Observable<void> {
		return this.firebaseService.delete(this._apiUrl, userId);
	}
}
