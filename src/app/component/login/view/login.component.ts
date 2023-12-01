import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImgPathEnum } from 'src/app/enum/img.path.enum';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { CredentialTrad, Credentials } from 'src/app/model/credentials.model';
import { LoginFormService } from 'src/app/service/form/login.form.service';
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

	public error: string = '';
	public form: FormGroup;

	private _subs: SubSink = new SubSink();
	public readonly imgSrc: string = ImgPathEnum.LOGIN;

	public readonly i18nCredential = CredentialTrad;
	public readonly i18nNamespace: string = 'login';

	constructor(private loginFormService: LoginFormService) {
		this.form = this.loginFormService.getForm();
	}

	ngOnInit(): void {}

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
}
