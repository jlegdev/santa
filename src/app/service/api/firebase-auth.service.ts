import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

import { User, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
	providedIn: 'root',
})
export class FirebaseAuthService {
	constructor() {}

	public register(email: string, password: string): Promise<any> {
		const auth: Auth = getAuth();
		return createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential: UserCredential) => {
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
		const auth: Auth = getAuth();
		return signInWithEmailAndPassword(auth, email, password)
			.then((userCredential: UserCredential) => {
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
		const auth: Auth = getAuth();
		return auth.signOut();
	}

	public getCurrentUser(): User | null {
		const auth: Auth = getAuth();
		return auth?.currentUser;
	}

	public isLoggedIn(): boolean {
		return this.getCurrentUser() != null;
	}
}
