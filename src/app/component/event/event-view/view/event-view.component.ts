import { Component, Input, OnInit } from '@angular/core';
import { EventStatuEnum } from 'src/app/enum/event.status.enum';
import { IconEnum } from 'src/app/enum/icon.enum';
import { ImgPathEnum } from 'src/app/enum/img.path.enum';
import { EventTrad, SantaEvent } from 'src/app/model/santa-event.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/api/auth.service';
import { DrawService } from 'src/app/service/business/draw.service';

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
	public readonly i18nEvent = EventTrad;
	public readonly IconEnum = IconEnum;
	public readonly EventStatuEnum = EventStatuEnum;
	public readonly imgSrc: ImgPathEnum;

	public isEventOfCurrentUser: boolean = false;
	constructor(private authService: AuthService, private drawService: DrawService) {
		this.imgSrc = ImgPathEnum.SANTA1;
	}

	ngOnInit(): void {
		const currentUser: User | undefined = this.authService.getCurrentUser();
		this.userGiver = this.drawService.getReceiverOfUserIdFromDrawResult(currentUser.id, this.event.drawResultActive);
		this.isEventOfCurrentUser = this.event.creator.id == currentUser.id;
	}

	public onUpdateDisplayGiver(): void {
		this.isGiverDisplayed = !this.isGiverDisplayed;
	}

	public OnUpdateEvent(): void {}
}
