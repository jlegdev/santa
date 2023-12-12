import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegexPatternEnum } from 'src/app/enum/regex.pattern.enum';

@Injectable({
	providedIn: 'root',
})
export class EventNewFormService {
	private _form: FormGroup;
	constructor(private formBuilder: FormBuilder) {
		this._form = this._initForm();
	}

	private _initForm(): FormGroup {
		const form: FormGroup = this.formBuilder.group({
			title: new FormControl(null, [Validators.required, Validators.pattern(RegexPatternEnum.EVENT_TITLE)]),
			description: new FormControl(null, [Validators.pattern(RegexPatternEnum.EVENT_DESCRIPTION)]),
			dateEvent: new FormControl(null, [Validators.required]),
			budget: new FormControl(null, [Validators.required, Validators.pattern(RegexPatternEnum.NUMBER_POSITIF)]),
		});
		return form;
	}

	public getForm(): FormGroup {
		return this._form;
	}
}
