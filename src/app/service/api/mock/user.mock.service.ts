import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { FirebaseService } from '../firebase.service';

@Injectable({
	providedIn: 'root',
})
export class UserMockService {
	private _apiUrl: string = 'events';
	constructor(private firebaseService: FirebaseService) {}

	public getOneUser(id: string): Observable<User> {
		const user$: Observable<User> = this.firebaseService.getOne<User>(this._apiUrl, id);
		return user$;
	}

	public getUsers(): Observable<User[]> {
		const users$: Observable<User[]> = this.firebaseService.getAll<User>(this._apiUrl);
		return users$;
	}

	public createUser(user: User): Observable<string> {
		return this.firebaseService.create(this._apiUrl, user);
	}

	public updateUser(user: Partial<User>, userId: string): Observable<void> {
		return this.firebaseService.update(this._apiUrl, userId, user);
	}

	public deleteUser(userId: string): Observable<void> {
		return this.firebaseService.delete(this._apiUrl, userId);
	}
}
