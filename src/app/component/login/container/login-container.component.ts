import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { Credentials } from 'src/app/model/credentials.model';
import { AuthService } from 'src/app/service/api/auth.service';
import { RoutingService } from 'src/app/service/utils/routing.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-login-container',
	templateUrl: './login-container.component.html',
	styleUrls: ['./login-container.component.scss'],
})
export class LoginContainerComponent implements OnInit, OnDestroy {
	public readonly i18nNamespace: string = 'login';
	public loadingState: LoadingState = LoadingState.INITIAL;
	public isLoading: boolean = false;

	private _subs: SubSink = new SubSink();
	constructor(private authService: AuthService, private routingService: RoutingService) {
		this.authService
			.isLoggedIn()
			.then((isLoggedIn: boolean) => {
				if (isLoggedIn) {
					this.routingService.navigate(RoutePathEnum.HOME);
				}
			})
			.catch((error: string) => console.error(error));
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this._subs.unsubscribe();
	}

	public onLogin(credential: Credentials): void {
		this._subs.add(
			this.authService.login(credential).subscribe((isLogin: boolean) => {
				if (isLogin) {
					this.loadingState = LoadingState.LOADED;
					this.routingService.navigate(RoutePathEnum.HOME);
				} else {
					this.loadingState = LoadingState.ERROR;
				}
			})
		);
	}

	public goOnRegisterPage(isGo: boolean): void {
		this.routingService.navigate(RoutePathEnum.REGISTER);
	}
}
