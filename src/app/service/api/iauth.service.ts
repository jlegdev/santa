import { Observable } from 'rxjs';
import { Credentials } from 'src/app/model/credentials.model';
import { UserModel } from 'src/app/model/user.model';

export interface IAuthService {
	login(credentials?: Credentials): Observable<boolean>;
	isLoggedIn(): Promise<boolean>;
	logout(): any;
	getCurrentUser(): UserModel;
	register(credential: Credentials): Observable<any>;
	// getToken(): Promise<string>;
	// refreshToken(): Promise<string>;
}
