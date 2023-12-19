import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/api/auth.service';
@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const obs: Observable<boolean> = from(this.authService.isLoggedIn()).pipe(
			map((isLoggedIn: boolean) => {
				if (isLoggedIn) {
					return true;
				} else {
					this.authService.logout();
					return false;
				}
			})
		);
		return obs;
	}
}
