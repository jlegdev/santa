import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserMock1, UserMock2 } from 'src/app/model/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor() {}

	public getOneUser(id: string): Observable<User> {
		return of(UserMock1);
	}

	public getUsers(): Observable<User[]> {
		return of([UserMock1, UserMock2]);
	}

	public createUser(user: User): Observable<string> {
		return of(user.id);
	}

	public updateUser(user: Partial<User>, userId: string): Observable<string> {
		return of(userId);
	}

	public deleteUser(userId: string): Observable<string> {
		return of(userId);
	}
}
