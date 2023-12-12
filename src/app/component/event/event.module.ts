import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PeoplePipeModule } from 'src/app/pipe/people-pipe/people-pipe.module';
import { TradPipeModule } from 'src/app/pipe/trad.module';
import { ConfirmButtonModule } from 'src/app/shared/components/ui/button/confirm-button/confirm-button/confirm-button.module';
import { SpinnerModule } from 'src/app/shared/components/ui/spinner/spinner/spinner.module';
import { EventCreateContainerComponent } from './event-create/container/event-create-container.component';
import { EventCreateViewComponent } from './event-create/view/event-create-view.component';
import { EventJoinContainerComponent } from './event-join/container/event-join-container.component';
import { EventJoinComponent } from './event-join/view/event-join.component';
import { EventListContainerComponent } from './event-list/container/event-list-container.component';
import { EventListComponent } from './event-list/view/event-list.component';
import { EventUpdateContainerComponent } from './event-update/container/event-update-container.component';
import { EventUpdateViewComponent } from './event-update/view/event-update-view.component';
import { EventViewContainerComponent } from './event-view/container/event-view-container.component';
import { DrawDetailComponent } from './event-view/view/draw-detail/draw-detail.component';
import { EventViewComponent } from './event-view/view/event-view.component';
import { EventInformationComponent } from './event-view/view/event-information/event-information.component';
const AngularModules: any[] = [CommonModule, ReactiveFormsModule, MatExpansionModule];
const UIModules: any[] = [SpinnerModule, ConfirmButtonModule];
const InternalModules: any[] = [TradPipeModule, PeoplePipeModule];
const MaterialModules: any[] = [
	MatCardModule,
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatFormFieldModule,
	MatNativeDateModule,
	MatDatepickerModule,
];

// const AngularModules: any[] = [CommonModule];
// const UIModules: any[] = [];
// const InternalModules: any[] = [TradPipeModule];
// const MaterialModules: any[] = [];
@NgModule({
	declarations: [
		EventJoinComponent,
		EventJoinContainerComponent,
		EventListComponent,
		EventListContainerComponent,
		EventViewComponent,
		EventViewContainerComponent,
		EventCreateContainerComponent,
		EventCreateViewComponent,
		EventUpdateContainerComponent,
		EventUpdateViewComponent,
		DrawDetailComponent,
  EventInformationComponent,
	],
	imports: [AngularModules, UIModules, InternalModules, MaterialModules],
})
export class EventModule {}
