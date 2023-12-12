import { Component, OnInit } from '@angular/core';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { SantaEventBasic } from 'src/app/model/santa-event.model';
import { EventService } from 'src/app/service/api/event.service';
import { RoutingService } from 'src/app/service/utils/routing.service';
import { UtilsService } from 'src/app/service/utils/utils.service';

@Component({
	selector: 'app-event-create-container',
	templateUrl: './event-create-container.component.html',
	styleUrls: ['./event-create-container.component.scss'],
})
export class EventCreateContainerComponent implements OnInit {
	public loading: LoadingState = LoadingState.INITIAL;
	constructor(private eventService: EventService, private routingService: RoutingService, private utilsService: UtilsService) {}

	ngOnInit(): void {}

	public onCreate(event: SantaEventBasic): void {
		this.eventService.createEvent(event).subscribe((eventId: string) => {
			const url: string = this.utilsService.formatURLString(RoutePathEnum.EVENT_VIEW, eventId);
			this.routingService.navigate(url);
		});
	}
}
