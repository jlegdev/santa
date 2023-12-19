import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { User, updateProfile } from 'firebase/auth';
import { NotifService } from '../utils/notif.service';
import { StorageService } from '../utils/storage.service';

interface FirebasError {
	code: any;
	message: string;
}
@Injectable({
	providedIn: 'root',
})
export class FirebaseAuthService {
	constructor(private auth: Auth, private notifService: NotifService, private storageService: StorageService) {}

	public register(email: string, password: string, firstName: string, lastName: string): Promise<boolean> {
		return createUserWithEmailAndPassword(this.auth, email, password)
			.then((userCredential: UserCredential) => {
				let user = userCredential.user;
				return this.updateProfile(user, firstName, lastName).then(() => {
					this.notifService.success('Inscription réussie, bienvenue ! ');
					return true;
				});
			})
			.catch((error: FirebasError) => {
				const errorCode = error.code;
				const errorMessage: string = error.message;
				console.log(error);
				if (errorMessage === 'WEAK_PASSWORD : Password should be at least 6 characters') {
					this.notifService.error('Au moins 6 caractères dans le password');
				}
				return false;
			});
	}
	public updateProfile(user: User, firstName: string, lastName: string): Promise<void> {
		return updateProfile(user, { displayName: `${firstName} ${lastName}` });
	}
	public login(email: string, password: string): Promise<boolean> {
		return signInWithEmailAndPassword(this.auth, email, password)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				this.notifService.success('Connexion réussie, bienvenue ! ');
				return true;
			})
			.catch((error: FirebasError) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error);
				this.notifService.error('Une erreure est survenue. Vérifiez vos identifiants');
				return false;
			});
	}

	public logout(): Promise<void> {
		return this.auth.signOut();
	}

	public getCurrentUser(): User | null {
		return this.auth.currentUser;
	}

	public isLoggedIn(): boolean {
		return this.getCurrentUser() != null;
	}
}
