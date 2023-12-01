import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class LoginFormService {
	private _form: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this._form = this._initForm();
	}

	private _initForm(): FormGroup {
		const form: FormGroup = this.formBuilder.group({
			password: new FormControl(null, [Validators.required]),
			login: new FormControl(null, [Validators.required]),
		});
		return form;
		// , Validators.pattern(RegexPatternEnum.EMAIL)
	}

	public getForm(): FormGroup {
		return this._form;
	}
}
