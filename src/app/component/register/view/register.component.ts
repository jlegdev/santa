import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ImgPathEnum } from 'src/app/enum/img.path.enum';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { Register, RegisterTrad } from 'src/app/model/credentials.model';
import { RegisterFormService } from 'src/app/service/form/register-form.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	@Input({ required: true })
	public loadingState: LoadingState = LoadingState.INITIAL;

	@Input({ required: true })
	public isLoading: boolean = false;

	@Output()
	public emitRegister: EventEmitter<Register> = new EventEmitter<Register>();

	@Output()
	public emitGoOnLoginPage: EventEmitter<boolean> = new EventEmitter<boolean>();

	public error: string = '';
	public form: FormGroup;

	private _subs: SubSink = new SubSink();
	public readonly imgSrc: string = ImgPathEnum.LOGIN;

	public readonly i18nRegister = RegisterTrad;
	public readonly i18nNamespace: string = 'register';

	constructor(private registerFormService: RegisterFormService) {
		this.form = this.registerFormService.getForm();
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
		const register: Register = this.form.value as Register;
		this.emitRegister.emit(register);
	}

	public goOnLoginPage(): void {
		this.emitGoOnLoginPage.emit(true);
	}
}
