import { Component, OnInit } from '@angular/core';
import { LoadingState } from 'src/app/enum/loading-state.enum';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { SantaEvent } from 'src/app/model/santa-event.model';
import { EventService } from 'src/app/service/api/event.service';
import { RoutingService } from 'src/app/service/utils/routing.service';
import { UtilsService } from 'src/app/service/utils/utils.service';

@Component({
	selector: 'app-event-join-container',
	templateUrl: './event-join-container.component.html',
	styleUrls: ['./event-join-container.component.scss'],
})
export class EventJoinContainerComponent implements OnInit {
	public loading: LoadingState = LoadingState.INITIAL;
	constructor(private eventService: EventService, private routingService: RoutingService, private utilsService: UtilsService) {}

	ngOnInit(): void {}

	public onJoin(eventToken: string): void {
		this.loading = LoadingState.LOADING;
		this.eventService.joinEvent(eventToken).subscribe({
			next: (event: SantaEvent) => {
				const url: string = this.utilsService.formatURLString(RoutePathEnum.EVENT_VIEW, event.id);
				this.routingService.navigate(url);
				this.loading = LoadingState.LOADED;
			},
			error: (e) => (this.loading = LoadingState.ERROR),
		});
	}
}
