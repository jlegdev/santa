import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserMock1, UserMock2, UserModel } from 'src/app/model/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserMockService {
	constructor() {}

	public getOneUser(id: string): Observable<UserModel> {
		return of(UserMock1);
	}

	public getUsers(): Observable<UserModel[]> {
		return of([UserMock1, UserMock2]);
	}

	public createUser(user: UserModel): Observable<string> {
		return of(user.id);
	}

	public updateUser(user: Partial<UserModel>, userId: string): Observable<string> {
		return of(userId);
	}

	public deleteUser(userId: string): Observable<string> {
		return of(userId);
	}
}
