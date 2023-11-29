import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { AuthService } from 'src/app/service/api/auth.service';
@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const obs: Observable<boolean> = from(this.authService.isLoggedIn()).pipe(
			map((isLoggedIn: boolean) => {
				if (isLoggedIn) {
					return true;
				} else {
					this.router.navigateByUrl(RoutePathEnum.LOGIN);
					return false;
				}
			})
		);
		return obs;
	}
}
