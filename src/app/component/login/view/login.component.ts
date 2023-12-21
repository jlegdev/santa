import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImgPathEnum } from 'src/app/enum/img.path.enum';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { CredentialTrad, Credentials } from 'src/app/model/credentials.model';
import { AuthService } from 'src/app/service/api/auth.service';
import { LoginFormService } from 'src/app/service/form/login.form.service';
import { RoutingService } from 'src/app/service/utils/routing.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	@Input({ required: true })
	public loadingState: LoadingState = LoadingState.INITIAL;

	@Input({ required: true })
	public isLoading: boolean = false;

	@Output()
	public emitCredentials: EventEmitter<Credentials> = new EventEmitter<Credentials>();
	@Output()
	public emitGoOnRegisterPage: EventEmitter<boolean> = new EventEmitter<boolean>();

	public error: string = '';
	public form: FormGroup;

	private _subs: SubSink = new SubSink();
	public readonly imgSrc: string = ImgPathEnum.LOGIN;

	public readonly i18nCredential = CredentialTrad;
	public readonly i18nNamespace: string = 'login';

	constructor(private authService: AuthService, private loginFormService: LoginFormService, private routingService: RoutingService) {
		this.form = this.loginFormService.getForm();
	}

	ngOnInit(): void {
		this.authService.isLoggedIn().then((isLoggedIn: boolean) => {
			if (isLoggedIn) {
				this.routingService.navigate(RoutePathEnum.HOME);
			}
		});
	}

	ngOnDestroy() {
		this._subs.unsubscribe();
	}

	public onValid(): void {
		this.form.markAllAsTouched();
		this.form.updateValueAndValidity();
		if (this.form?.invalid) {
			return;
		}
		const credential: Credentials = this.form.value as Credentials;
		this.emitCredentials.emit(credential);
	}

	public goOnRegisterPage(): void {
		this.emitGoOnRegisterPage.emit(true);
	}
}
