import { Component, Input } from '@angular/core';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { SantaEvent } from 'src/app/model/santa-event.model';
import { RoutingService } from 'src/app/service/utils/routing.service';
import { UtilsService } from 'src/app/service/utils/utils.service';

@Component({
	selector: 'app-event-view-card-container',
	templateUrl: './event-view-card-container.component.html',
	styleUrls: ['./event-view-card-container.component.scss'],
})
export class EventViewCardContainerComponent {
	@Input({ required: true })
	public event!: SantaEvent;

	constructor(private router: RoutingService, private utilsService: UtilsService) {}

	ngOnInit(): void {}

	public onViewEvent(onViewEvent: { id: string; isNewTab: boolean }): void {
		const url: string = this.utilsService.formatURLString(RoutePathEnum.EVENT_VIEW, onViewEvent.id);
		this.router.navigate(url, onViewEvent.isNewTab);
	}
}
