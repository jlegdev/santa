import { Component, Input, OnInit } from '@angular/core';
import { EventStatuEnum } from 'src/app/enum/event.status.enum';
import { IconEnum } from 'src/app/enum/icon.enum';
import { ImgPathEnum } from 'src/app/enum/img.path.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { DrawRelation, DrawResult } from 'src/app/model/draw.model';
import { EventTrad, SantaEvent } from 'src/app/model/santa-event.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/api/auth.service';
import { DrawService } from 'src/app/service/business/draw.service';
import { DialogService } from 'src/app/service/dialog.service';
import { RoutingService } from 'src/app/service/utils/routing.service';
import { UtilsService } from 'src/app/service/utils/utils.service';
import { ButtonActionTradEnum } from 'src/app/shared/enum/button-action-trad.enum';

@Component({
	selector: 'app-event-view',
	templateUrl: './event-view.component.html',
	styleUrls: ['./event-view.component.scss'],
})
export class EventViewComponent implements OnInit {
	@Input({ required: true })
	public event!: SantaEvent;

	public userGiver!: User;
	public isGiverDisplayed: boolean = false;
	public isResultActiveDrawDisplayed: boolean = false;
	public readonly i18nNamespace: string = 'event.view';
	public readonly i18nNamespaceButton: string = 'general.button';
	public readonly i18nEvent = EventTrad;
	public readonly IconEnum = IconEnum;
	public readonly EventStatuEnum = EventStatuEnum;
	public readonly imgSrc: ImgPathEnum;

	public isEventOfCurrentUser!: boolean;
	constructor(
		private authService: AuthService,
		private drawService: DrawService,
		private dialogService: DialogService,
		private routingService: RoutingService,
		private utilsService: UtilsService
	) {
		this.imgSrc = ImgPathEnum.SANTA1;
	}

	ngOnInit(): void {
		const currentUser: User | undefined = this.authService.getCurrentUser();
		if (this.event.drawResultActive) {
			this.userGiver = this.drawService.getReceiverOfUserIdFromDrawResult(currentUser.id, this.event.drawResultActive);
		}
		// this.isEventOfCurrentUser = this.event.creator.id == currentUser.id;
		this.isEventOfCurrentUser = true;
	}

	public onUpdateDisplayGiver(): void {
		this.isGiverDisplayed = !this.isGiverDisplayed;
	}

	public onUpdateDisplayDraw(isDisplayed: boolean): void {
		this.isResultActiveDrawDisplayed = isDisplayed;
	}

	public OnUpdateEvent(): void {
		const url: string = this.utilsService.formatURLString(RoutePathEnum.EVENT_UPDATE, this.event.id);
		this.routingService.navigate(url);
	}

	public onLaunchDraft(): void {
		this.dialogService
			.openConfirmActionDialog(`${this.i18nNamespace}.draw.dialog`, ButtonActionTradEnum.VALIDATE)
			.subscribe((shouldDrawBeLaunched: boolean) => {
				if (shouldDrawBeLaunched) {
					const drawRelations: DrawRelation[] = this.drawService.createDrawRelations(this.event);
					const drawResult: DrawResult = { isActive: true, dateDraft: new Date(), relations: drawRelations };
					console.log(drawResult);
					this.event.drawResultActive = drawResult;
					this.isResultActiveDrawDisplayed = true;
				}
			});
	}
}
