import { Component, OnInit } from '@angular/core';
import { catchError, finalize, map } from 'rxjs';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { Credentials } from 'src/app/model/credentials.model';
import { AuthService } from 'src/app/service/api/auth.service';
import { LoginFormService } from 'src/app/service/form/login.form.service';
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
	constructor(private authService: AuthService, private routingService: RoutingService, private loginFormService: LoginFormService) {
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
			}),
			catchError((error) => {
				this.loadingState = LoadingState.ERROR;
				return error;
			}),
			finalize(() => (this.isLoading = false))
		);
	}
}
