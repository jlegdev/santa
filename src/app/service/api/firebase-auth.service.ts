import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root',
})
export class FirebaseAuthService {
	constructor(private auth: Auth) {}

	public register(email: string, password: string): Promise<any> {
		return createUserWithEmailAndPassword(this.auth, email, password)
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
		return signInWithEmailAndPassword(this.auth, email, password)
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

	public getCurrentUser(): any {
		return this.auth.currentUser;
	}

	public isLoggedIn(): boolean {
		return this.getCurrentUser() != null;
	}
}
