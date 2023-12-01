import { Component, OnInit } from '@angular/core';
import { IconEnum } from 'src/app/enum/icon.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { AuthService } from 'src/app/service/api/auth.service';
import { TradService } from 'src/app/service/trad.service';
import { RoutingService } from 'src/app/service/utils/routing.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	public readonly IconEnum = IconEnum;
	public readonly RoutePathEnum = RoutePathEnum;
	public readonly i18nNamespace: string = 'navbar';
	constructor(private authService: AuthService, private routingService: RoutingService, private tradService: TradService) {}

	ngOnInit(): void {}

	public onTitleClick(): void {
		this.routingService.navigate(RoutePathEnum.HOME);
	}

	public onLogout(): void {
		this.authService.logout();
	}

	/**
	 * Change la langue courante
	 */
	public onLanguageChange(languageIndex: any): void {
		this.tradService.changeLanguage(languageIndex);
	}
}
