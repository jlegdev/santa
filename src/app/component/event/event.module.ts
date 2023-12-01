import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ConfirmButtonModule } from 'src/app/shared/components/ui/button/confirm-button/confirm-button/confirm-button.module';
import { SpinnerModule } from 'src/app/shared/components/ui/spinner/spinner/spinner.module';
import { TradPipeModule } from 'src/app/shared/trad.module';
import { EventCreateContainerComponent } from './event-create/container/event-create-container.component';
import { EventCreateViewComponent } from './event-create/view/event-create-view.component';
import { EventJoinContainerComponent } from './event-join/container/event-join-container.component';
import { EventJoinComponent } from './event-join/view/event-join.component';
import { EventListContainerComponent } from './event-list/container/event-list-container.component';
import { EventListComponent } from './event-list/view/event-list.component';
import { EventUpdateContainerComponent } from './event-update/container/event-update-container.component';
import { EventUpdateViewComponent } from './event-update/view/event-update-view.component';
import { EventViewContainerComponent } from './event-view/container/event-view-container.component';
import { EventViewComponent } from './event-view/view/event-view.component';

const AngularModules: any[] = [CommonModule, ReactiveFormsModule];
const UIModules: any[] = [SpinnerModule, ConfirmButtonModule];
const InternalModules: any[] = [TradPipeModule];
const MaterialModules: any[] = [MatCardModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule];

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
	],
	imports: [AngularModules, UIModules, InternalModules, MaterialModules],
})
export class EventModule {}
