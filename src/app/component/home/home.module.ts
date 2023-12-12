import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TradPipeModule } from 'src/app/pipe/trad.module';
import { SpinnerModule } from 'src/app/shared/components/ui/spinner/spinner/spinner.module';
import { EventViewCardModule } from '../event/event-view-card/event-view-card.module';
import { HomeContainerComponent } from './container/home-container.component';
import { HomeComponent } from './view/home.component';

const AngularModules: any[] = [CommonModule];
const UIModules: any[] = [SpinnerModule, EventViewCardModule];
const InternalModules: any[] = [TradPipeModule];
const MaterialModules: any[] = [MatCardModule, MatButtonModule];

@NgModule({
	declarations: [HomeContainerComponent, HomeComponent],
	imports: [AngularModules, UIModules, InternalModules, MaterialModules],
})
export class HomeModule {}
