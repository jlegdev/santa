import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { SantaEvent } from 'src/app/model/santa-event.model';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/api/auth.service';
import { EventService } from 'src/app/service/api/event.service';
import { RoutingService } from 'src/app/service/utils/routing.service';

@Component({
	selector: 'app-home-container',
	templateUrl: './home-container.component.html',
	styleUrls: ['./home-container.component.scss'],
})
export class HomeContainerComponent implements OnInit {
	public currentUser: UserModel;
	public events$!: Observable<Array<SantaEvent>>;
	public events: Array<SantaEvent> = [];

	constructor(private authService: AuthService, private eventService: EventService, private routingService: RoutingService) {
		this.currentUser = this.authService.getCurrentUser();
	}

	ngOnInit(): void {
		this._initEvents();
	}

	private _initEvents(): void {
		console.log('current suer');
		console.log(this.currentUser);

		this.events$ = this.eventService.getEventsOfUser(this.currentUser);
		this.events$.subscribe((result) => {
			this.events = result;
		});
	}

	public onCreateEvent(): void {
		this.routingService.navigate(RoutePathEnum.EVENT_CREATE);
	}

	public onJoinEvent(): void {
		this.routingService.navigate(RoutePathEnum.EVENT_JOIN);
	}
}
