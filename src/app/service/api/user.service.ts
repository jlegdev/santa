import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/model/user.model';
import { FirebaseService } from './firebase.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private _apiUrl: string = 'events';
	constructor(private firebaseService: FirebaseService) {}

	public getOneUser(id: string): Observable<UserModel> {
		const user$: Observable<UserModel> = this.firebaseService.getOne<UserModel>(this._apiUrl, id);
		return user$;
	}

	public getUsers(): Observable<UserModel[]> {
		const users$: Observable<UserModel[]> = this.firebaseService.getAll<UserModel>(this._apiUrl);
		return users$;
	}

	public createUser(user: UserModel): Observable<string> {
		return this.firebaseService.create(this._apiUrl, user);
	}

	public updateUser(user: Partial<UserModel>, userId: string): Observable<void> {
		return this.firebaseService.update(this._apiUrl, userId, user);
	}

	public deleteUser(userId: string): Observable<void> {
		return this.firebaseService.delete(this._apiUrl, userId);
	}
}
