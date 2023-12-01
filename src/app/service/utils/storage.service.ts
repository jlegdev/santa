import { Injectable } from '@angular/core';
import { StorageKeyEnum } from '../../enum/storage-key.enum';
import { User } from '../../model/user.model';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor() {}

	public clear(): void {
		localStorage.clear();
		this._removeLocal(StorageKeyEnum.KEY_USER);
		this._removeLocal(StorageKeyEnum.KEY_TOKEN);
	}

	/** GETTER **/
	public getToken(): string {
		return this._getLocal(StorageKeyEnum.KEY_TOKEN);
	}

	public getUser(): User | undefined {
		const user: User | string = this._getLocal(StorageKeyEnum.KEY_USER);
		return user ? (JSON.parse(user) as User) : undefined;
	}
	public getLang(): string {
		// on récupère "en"
		// on veut supprimer les '"'
		// ouais c'est moche
		// prendre le temps d'harmoniser cela
		const lang: string = this._getLocal(StorageKeyEnum.KEY_LANG).replace('"', '').replace('"', '');
		return lang;
	}
	/** DELETE **/
	public deleteToken(): void {
		this._removeLocal(StorageKeyEnum.KEY_TOKEN);
	}

	public deleteUser(): void {
		this._removeLocal(StorageKeyEnum.KEY_USER);
	}

	public deleteLang(): void {
		this._removeLocal(StorageKeyEnum.KEY_LANG);
	}
	/** STORE **/
	public storeToken(token: string): void {
		this.deleteToken();
		this._storeLocal(StorageKeyEnum.KEY_TOKEN, String(token));
	}

	public storeUser(user: User): void {
		this.deleteUser();
		this._storeLocal(StorageKeyEnum.KEY_USER, user);
	}

	public storeLang(lang: string): void {
		this.deleteLang();
		this._storeLocal(StorageKeyEnum.KEY_LANG, lang);
	}
	/**
	 * Récupère une donnée de la session
	 * @param key la référence de la donnée à récupérer
	 */
	private _getLocal(key: string): string {
		const result: string | null = localStorage.getItem(key);
		return result ? result : '';
	}

	/**
	 * Supprime une référence sauvegardée dans le navigateur
	 * @param key la référence à supprimer
	 */
	private _removeLocal(key: string): void {
		localStorage.removeItem(key);
	}

	/**
	 * Sauvegarde une information dans le navigateur.
	 * Cette sauvegarde n'est PAS effacée à la fermeture de la session
	 * Cette sauvegarde est partagée entre les différents onglets
	 * @param key la référence de l'information
	 * @param data l'information à sauvegarder
	 */
	private _storeLocal(key: string, data: any) {
		if (!(data instanceof String) && key !== StorageKeyEnum.KEY_TOKEN) {
			data = JSON.stringify(data);
		}
		localStorage.setItem(key, data);
	}

	/**
	 * Sauvegarde une information dans le navigateur.
	 * Cette sauvegarde sera effacée à la fermeture de la session
	 * Cette sauvegarde n'est pas partagée entre les différents onglets
	 * @param key la référence de l'information
	 * @param data l'information a sauvegarder
	 */
	private _storeSessionInfo(key: StorageKeyEnum, data: any) {
		if (!(data instanceof String) && key !== StorageKeyEnum.KEY_TOKEN) {
			data = JSON.stringify(data);
		}
		sessionStorage.setItem(key, data);
	}

	/**
	 * Supprime une référence sauvegardée dans la session du navigateur
	 * @param key la référence à supprimer
	 */
	private _removeSessionItem(key: string): void {
		sessionStorage.removeItem(key);
	}
}
