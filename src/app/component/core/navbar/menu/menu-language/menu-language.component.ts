import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IconEnum } from 'src/app/enum/icon.enum';
import { LangIcon, TradService } from 'src/app/service/trad.service';
@Component({
	selector: 'app-menu-language',
	templateUrl: './menu-language.component.html',
	styleUrls: ['./menu-language.component.scss'],
})
export class MenuLanguageComponent implements OnInit {
	@Output()
	private emitLanguageChange: EventEmitter<string> = new EventEmitter<string>();
	public readonly IconEnum = IconEnum;

	public languagesAvailable: LangIcon[] = [];
	constructor(private tradService: TradService) {}

	ngOnInit() {
		this.languagesAvailable = this.tradService.getLangsObject();
	}

	public onLanguageChange(index: string): void {
		this.emitLanguageChange.emit(index);
	}

	public trackLanguage(index: number, element: LangIcon): string {
		return element.index;
	}
}
