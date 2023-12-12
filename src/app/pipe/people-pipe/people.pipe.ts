import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';

@Pipe({
	name: 'people',
})
export class PeoplePipe implements PipeTransform {
	constructor() {}

	transform(value: { firstName: string; lastName: string }) {
		return of(`${value.firstName} ${value.lastName}`);
	}
}
