import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegexPatternEnum } from 'src/app/enum/regex.pattern.enum';

@Injectable({
	providedIn: 'root',
})
export class EventJoinFormService {
	private _form: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this._form = this._initForm();
	}

	private _initForm(): FormGroup {
		const form: FormGroup = this.formBuilder.group({
			token: new FormControl(null, [Validators.required, Validators.pattern(RegexPatternEnum.EVENT_TOKEN)]),
		});
		return form;
	}

	public getForm(): FormGroup {
		return this._form;
	}
}
