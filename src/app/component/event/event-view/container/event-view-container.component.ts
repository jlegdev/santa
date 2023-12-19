import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { SantaEvent } from 'src/app/model/santa-event.model';
import { EventService } from 'src/app/service/api/event.service';
import { DrawService } from 'src/app/service/business/draw.service';
import { DialogService } from 'src/app/service/dialog.service';
import { ButtonActionTradEnum } from 'src/app/shared/enum/button-action-trad.enum';

@Component({
	selector: 'app-event-view-container',
	templateUrl: './event-view-container.component.html',
	styleUrls: ['./event-view-container.component.scss'],
})
export class EventViewContainerComponent implements OnInit {
	private idEvent: string;
	public event$: Observable<SantaEvent>;
	public readonly i18nNamespace: string = 'event.view';

	constructor(
		private route: ActivatedRoute,
		private eventService: EventService,
		private drawService: DrawService,
		private dialogService: DialogService
	) {
		this.idEvent = this.route.snapshot.paramMap.get('id') ?? '';
		this.event$ = this.eventService.getOneEvent(this.idEvent);
	}

	ngOnInit(): void {}

	public onLaunchDraft(event: SantaEvent): void {
		this.dialogService
			.openConfirmActionDialog(`${this.i18nNamespace}.draw.dialog`, ButtonActionTradEnum.VALIDATE)
			.pipe(
				switchMap((shouldDrawBeLaunched: boolean) => {
					if (shouldDrawBeLaunched) {
						return this.drawService.launchDraft(event).pipe(map(() => (this.event$ = this.eventService.getOneEvent(this.idEvent))));
					} else {
						return of(shouldDrawBeLaunched);
					}
				})
			)
			.subscribe(() => {});
	}
}
