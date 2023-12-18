import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
	providedIn: 'root',
})
export class FirebaseAuthService {
	constructor(private auth: AngularFireAuth) {}

	public register(email: string, password: string): Promise<any> {
		return this.auth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				console.log(user);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
				console.log(error);
			});
	}

	public login(email: string, password: string): Promise<any> {
		return this.auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				console.log(user);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error);
			});
	}

	public logout(): Promise<void> {
		return this.auth.signOut();
	}

	public getCurrentUser(): Promise<any> {
		return this.auth.currentUser;
	}

	public isLoggedIn(): boolean {
		return this.getCurrentUser() != null;
	}
}
