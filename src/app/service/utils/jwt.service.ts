import { Injectable, OnDestroy } from '@angular/core';
// import jwt_decode, { JwtPayload } from 'jwt-decode';
@Injectable({
	providedIn: 'root',
})
export class JwtUtilsServices implements OnDestroy {
	constructor() {}

	ngOnDestroy() {}

	// public isTokenExpired(token: string): boolean {
	// 	const decodedToken: string = this.decodeJWT(token);
	// 	return new Date() < new Date(this._getExpirationDate(decodedToken));
	// }

	// public decodeJWT(token: string): any {
	// 	return jwt_decode(token) as JwtPayload;
	// }

	// private _getExpirationDate(decodedToken: any): any {
	// 	return decodedToken.exp;
	// }
}
