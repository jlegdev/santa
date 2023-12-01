import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RoutePathEnum } from '../enum/route.path.enum';
import { StorageKeyEnum } from '../enum/storage-key.enum';
import { TradService } from '../service/trad.service';
import { NotifService } from '../service/utils/notif.service';
import { StorageService } from '../service/utils/storage.service';
import { ApiUrlEnvPath, EnvPathTradKeyMap } from './api-notif-key';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
	private readonly _i18nNamespace: string = 'general.request';

	constructor(private router: Router, private notifService: NotifService, private tradService: TradService, private storageService: StorageService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = localStorage.getItem(StorageKeyEnum.KEY_TOKEN);

		if (token) {
			request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
		}

		return next.handle(request).pipe(
			tap(
				(response: any) => {
					if (response instanceof HttpResponse) {
						if (this._isUrlNotified(response.url as string)) {
							this._handleSuccessResponse(response, request);
						}
					}
				},
				(error: HttpErrorResponse) => {
					if (this._isUrlNotified(error.url as string)) {
						this._handleErrorResponse(error, request);
					}
				}
			)
		);
	}

	/**
	 * Fonction qui gère les réponses succès
	 * @param response
	 * @param request
	 */
	private _handleSuccessResponse(response: HttpResponse<any>, request: HttpRequest<any>): void {
		// On récupère l'url tel que déclaré dans le fichier d'environnement
		const tradKey: string = this._findTradKeyMatchingUrl(response.url as string, response.status, request.method);

		if (tradKey != '') {
			this._displayNotifWithTradKey(tradKey, true);
		} else {
			this._handleGenericSuccessResponse(response, request);
		}
	}

	private _handleGenericSuccessResponse(response: HttpResponse<any>, request: HttpRequest<any>): void {
		let title: string = '';
		let message: string = '';
		switch (request.method) {
			case 'PUT':
				title = this.tradService.instant('success.title', this._i18nNamespace + '.put');
				message = this.tradService.instant('success.message', this._i18nNamespace + '.put');
				break;
			case 'POST':
				title = this.tradService.instant('success.title', this._i18nNamespace + '.post');
				message = this.tradService.instant('success.message', this._i18nNamespace + '.post');
				break;
			case 'DELETE':
				title = this.tradService.instant('success.title', this._i18nNamespace + '.delete');
				message = this.tradService.instant('success.message', this._i18nNamespace + '.delete');
				break;
			case 'PATCH':
				// if (request.url.includes(environment.api.user.url)) {
				// 	title = this.tradService.instant('success.title', this._i18nNamespace + '.user.patch');
				// 	message = this.tradService.instant('success.message', this._i18nNamespace + '.user.patch');
				// } else {
				title = this.tradService.instant('success.title', this._i18nNamespace + '.put');
				message = this.tradService.instant('success.message', this._i18nNamespace + '.put');
				// }
				break;
		}
		if (title != '' && message != '') {
			this.notifService.successWithTitle(title, message);
		}
	}

	/**
	 * Fonction qui gère les erreurs réponses
	 * @param error
	 * @param request
	 */
	private _handleErrorResponse(error: HttpErrorResponse, request: HttpRequest<any>): void {
		// On récupère l'url tel que déclaré dans le fichier d'environnement
		const tradKey: string = this._findTradKeyMatchingUrl(error.url as string, error.status, request.method);
		if (tradKey) {
			this._displayNotifWithTradKey(tradKey, false);
		} else {
			this._handleGenericErrorResponse(error, request);
		}
	}

	private _handleGenericErrorResponse(error: HttpErrorResponse, request: HttpRequest<any>): void {
		let title: string = this.tradService.instant('error.title', this._i18nNamespace + '');
		const keyTrad: string = `general.request.${error.status}.message`;
		let message: string = this.tradService.instant(keyTrad);
		message = message != keyTrad ? message : this.tradService.instant(`generic.message`, 'general.request');
		switch (error.status) {
			case 511:
				this.storageService.clear();
				this.router.navigateByUrl(RoutePathEnum.LOGIN);
				break;
			// case 401:
			// 	this.jwtService.clear();
			// 	this.router.navigateByUrl(RoutePathEnum.LOGIN);
			// 	break;
		}
		this.notifService.error(title, message);
	}

	/**
	 * Teste une url
	 * Renvoie si cette url doit être notifié en cas d'erreur
	 * La liste des url non concernées est défini dans cette fonction
	 * @param url
	 * @returns
	 */
	private _isUrlNotified(url: string): boolean {
		// On remplace les potentiels numéros dans l'url (donc des id comme user/T0456135/ ou equipment/15 ) par '{id}'
		// On fait ça afin de pouvoir comparer des url définis dans le fichier environnement
		// Solution statique qui nécessite que les url soient définis dans le fichier d'environnement tel que tous les parties dynamiques de l'url
		// soit matérialisées par  '{id}'. par exemple url: urlTest/{prenom} ne fonctionnera pas. url: urlTest/{id} fonctionnera
		const urlCleared: string = this._getUrlEnvironment(url);
		// const urlNotNotified: string[] = [environment.api.test.url];
		const urlNotNotified: string[] = [];
		return urlNotNotified.every((urlNotNotified: string) => !urlCleared.includes(urlNotNotified));
	}

	/**
	 * Prend en paramètre une url en paramètre et la retourne à son format défini dans le fichier d'environnement
	 * @param url
	 * @returns
	 */
	private _getUrlEnvironment(url: string): string {
		return (
			url
				// On supprime le prefix
				// .replace(`${environment.apiUrl}/${environment.apiVersion}/`, '')
				// On supprime les id mongodb
				.replace(/[a-f\d]{24}/i, '{id}')
				// on supprime les id traditionnesl
				.replace(/[0-9]/g, '{id}')
		);
	}

	private _findTradKeyMatchingUrl(url: string, status: number, method: string): string {
		let result: string = '';
		// On récupère l'url telle que déclaré dans le fichier d'environnement
		const urlCleared: string = this._getUrlEnvironment(url);
		// On récupère la clé associée à l'url (si elle existe)
		const envPath: string | undefined = ApiUrlEnvPath.get(urlCleared);
		if (envPath) {
			// console.log(envPath);
			// On récupère la clé de traduction associée à la clé récupérée précédemment
			const tradKey: string | undefined = EnvPathTradKeyMap.get(`${envPath}.${status}.${method.toLowerCase()}`);
			// console.log(`${envPath}.${status}.${method.toLowerCase()}`, tradKey);
			if (tradKey) {
				// Si elle existe alors, on la retourne
				result = tradKey;
			}
		}
		return result;
	}

	private _displayNotifWithTradKey(tradKey: string, isSuccess: boolean): void {
		const title: string = this.tradService.instant(`${tradKey}.title`, this._i18nNamespace);
		const message: string = this.tradService.instant(`${tradKey}.message`, this._i18nNamespace);
		if (isSuccess) {
			this.notifService.successWithTitle(title, message);
		} else {
			this.notifService.errorWithTitle(title, message);
		}
	}
}
