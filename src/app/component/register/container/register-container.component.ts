import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { Register } from 'src/app/model/credentials.model';
import { AuthService } from 'src/app/service/api/auth.service';
import { RoutingService } from 'src/app/service/utils/routing.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-register-container',
	templateUrl: './register-container.component.html',
	styleUrls: ['./register-container.component.scss'],
})
export class RegisterContainerComponent implements OnInit, OnDestroy {
	public readonly i18nNamespace: string = 'register';
	public loadingState: LoadingState = LoadingState.INITIAL;
	public isLoading: boolean = false;

	public _subs: SubSink = new SubSink();
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

	public onRegister(register: Register): void {
		this._subs.add(
			this.authService.register(register).subscribe((isRegistered: boolean) => {
				if (isRegistered) {
					this.loadingState = LoadingState.LOADED;
					this.routingService.navigate(RoutePathEnum.HOME);
				} else {
					this.loadingState = LoadingState.ERROR;
				}
			})
		);
	}

	public goOnLoginPage(): void {
		this.routingService.navigate(RoutePathEnum.LOGIN);
	}
}
