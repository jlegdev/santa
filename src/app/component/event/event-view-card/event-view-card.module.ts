import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TradPipeModule } from 'src/app/shared/trad.module';
import { EventViewCardContainerComponent } from './container/event-view-card-container.component';
import { EventViewCardComponent } from './view/event-view-card.component';

const AngularModules: any[] = [CommonModule];
const UIModules: any[] = [];
const InternalModules: any[] = [TradPipeModule];
const MaterialModules: any[] = [MatCardModule, MatButtonModule, MatIconModule];
@NgModule({
	declarations: [EventViewCardComponent, EventViewCardContainerComponent],
	imports: [AngularModules, UIModules, InternalModules, MaterialModules],
	exports: [EventViewCardContainerComponent],
})
export class EventViewCardModule {}
