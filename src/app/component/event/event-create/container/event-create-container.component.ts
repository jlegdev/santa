import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { SantaEvent, SantaEventBasic } from 'src/app/model/santa-event.model';
import { EventService } from 'src/app/service/api/event.service';
import { TradService } from 'src/app/service/trad.service';
import { NotifService } from 'src/app/service/utils/notif.service';
import { RoutingService } from 'src/app/service/utils/routing.service';
import { UtilsService } from 'src/app/service/utils/utils.service';

@Component({
	selector: 'app-event-create-container',
	templateUrl: './event-create-container.component.html',
	styleUrls: ['./event-create-container.component.scss'],
})
export class EventCreateContainerComponent implements OnInit {
	public loading: LoadingState = LoadingState.INITIAL;
	constructor(
		private eventService: EventService,
		private notifService: NotifService,
		private routingService: RoutingService,
		private tradService: TradService,
		private utilsService: UtilsService
	) {}

	ngOnInit(): void {}

	public onCreate(event: SantaEventBasic): void {
		this.eventService
			.createEvent(event)
			.pipe(switchMap((eventId: string) => this.eventService.getOneEvent(eventId)))
			.subscribe((event: SantaEvent) => {
				console.log(event);
				const url: string = this.utilsService.formatURLString(RoutePathEnum.EVENT_VIEW, event.id);
				const successMessage: string = this.tradService.instant('success', 'event.create', { token: event.token });
				this.notifService.success(successMessage);
				this.routingService.navigate(url);
			});
	}
}
