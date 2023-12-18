import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map } from 'rxjs';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { Register } from 'src/app/model/credentials.model';
import { AuthService } from 'src/app/service/api/auth.service';
import { TradService } from 'src/app/service/trad.service';
import { NotifService } from 'src/app/service/utils/notif.service';
import { RoutingService } from 'src/app/service/utils/routing.service';

@Component({
	selector: 'app-register-container',
	templateUrl: './register-container.component.html',
	styleUrls: ['./register-container.component.scss'],
})
export class RegisterContainerComponent implements OnInit {
	public readonly i18nNamespace: string = 'register';
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

	public onRegister(register: Register): void {
		this.authService.login(register).pipe(
			map((response) => {
				this.loadingState = LoadingState.LOADED;
				this.notifService.success(this.tradService.instant('success', this.i18nNamespace));
				this.routingService.navigate(RoutePathEnum.LOGIN);
			}),
			catchError((error) => {
				this.loadingState = LoadingState.ERROR;
				this.notifService.error(this.tradService.instant('error', this.i18nNamespace, { error: error }));
				return error;
			}),
			finalize(() => (this.isLoading = false))
		);
	}

	public goOnLoginPage(): void {
		this.routingService.navigate(RoutePathEnum.LOGIN);
	}
}
