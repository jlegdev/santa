import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutePathEnum } from 'src/app/enum/route.path.enum';
import { SantaEvent } from 'src/app/model/santa-event.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/api/auth.service';
import { EventService } from 'src/app/service/api/event.service';
import { RoutingService } from 'src/app/service/utils/routing.service';

@Component({
	selector: 'app-home-container',
	templateUrl: './home-container.component.html',
	styleUrls: ['./home-container.component.scss'],
})
export class HomeContainerComponent implements OnInit {
	public currentUser: User;
	public events$!: Observable<Array<SantaEvent>>;

	constructor(private authService: AuthService, private eventService: EventService, private routingService: RoutingService) {
		this.currentUser = this.authService.getCurrentUser();
	}

	ngOnInit(): void {
		this._initUser();
		this._initEvents();
	}

	private _initUser(): void {}

	private _initEvents(): void {
		this.events$ = this.eventService.getEvents();
	}

	public onCreateEvent(): void {
		console.log('on create event');
	}

	public onJoinEvent(): void {
		this.routingService.navigate(RoutePathEnum.EVENT_JOIN);
	}
}
