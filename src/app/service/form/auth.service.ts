import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexPatternEnum } from 'src/app/enum/regex.pattern.enum';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _form: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this._form = this._initForm();
	}

	private _initForm(): FormGroup {
		const form: FormGroup = this.formBuilder.group({
			password: [null, [Validators.required]],
			email: [null, [Validators.required, Validators.pattern(RegexPatternEnum.EMAIL)]],
		});
		return form;
	}

	public getForm(): FormGroup {
		return this._form;
	}
}
