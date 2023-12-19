import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map } from 'rxjs';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { Credentials } from 'src/app/model/credentials.model';
import { AuthService } from 'src/app/service/api/auth.service';
import { TradService } from 'src/app/service/trad.service';
import { NotifService } from 'src/app/service/utils/notif.service';
import { RoutingService } from 'src/app/service/utils/routing.service';

@Component({
	selector: 'app-login-container',
	templateUrl: './login-container.component.html',
	styleUrls: ['./login-container.component.scss'],
})
export class LoginContainerComponent implements OnInit {
	public readonly i18nNamespace: string = 'login';
	public loadingState: LoadingState = LoadingState.INITIAL;
	public isLoading: boolean = false;
	constructor(
		private authService: AuthService,
		private routingService: RoutingService,
		private notifService: NotifService,
		private tradService: TradService
	) {
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

	public onLogin(credential: Credentials): void {
		this.authService.login(credential).pipe(
			map((response) => {
				this.loadingState = LoadingState.LOADED;
				this.notifService.error(this.tradService.instant('success', this.i18nNamespace));
				console.log(response);
			}),
			catchError((error) => {
				this.loadingState = LoadingState.ERROR;
				this.notifService.error(this.tradService.instant('error', this.i18nNamespace, { error: error }));
				console.log(error);
				return error;
			}),
			finalize(() => (this.isLoading = false))
		);
	}

	public goOnRegisterPage(isGo: boolean): void {
		this.routingService.navigate(RoutePathEnum.REGISTER);
	}
}
