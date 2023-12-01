import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { TradService } from '../service/trad.service';

@Pipe({
	name: 'trad',
})
export class TradPipe implements PipeTransform {
	constructor(private tradService: TradService) {}

	transform(value: string, namespace?: string, data: object = {}) {
		return value ? this.tradService.get(value, namespace, data) : of(value);
	}
}
