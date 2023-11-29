import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './component/core/main-layout/main-layout.component';
import { EventJoinContainerComponent } from './component/event/event-join/container/event-join-container.component';
import { EventJoinComponent } from './component/event/event-join/view/event-join.component';
import { EventListContainerComponent } from './component/event/event-list/container/event-list-container.component';
import { EventListComponent } from './component/event/event-list/view/event-list.component';
import { EventViewContainerComponent } from './component/event/event-view/container/event-view-container.component';
import { EventViewComponent } from './component/event/event-view/view/event-view.component';
import { HomeContainerComponent } from './component/home/container/home-container.component';
import { HomeComponent } from './component/home/view/home.component';
import { LoginContainerComponent } from './component/login/container/login-container.component';
import { LoginComponent } from './component/login/view/login.component';
import { authServiceProviderFactory } from './service/providers/auth.service.provider';
import { eventServiceProviderFactory } from './service/providers/event.service.provider';
import { userServiceProviderFactory } from './service/providers/user.service.provider';
import { SpinnerModule } from './shared/components/ui/spinner/spinner/spinner.module';

const AngularModules: any[] = [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, ReactiveFormsModule];
const MaterialModules: any[] = [MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule];
const UIModules: any[] = [SpinnerModule];
@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		EventJoinComponent,
		EventListComponent,
		EventViewComponent,
		EventJoinContainerComponent,
		EventListContainerComponent,
		EventViewContainerComponent,
		HomeContainerComponent,
		MainLayoutComponent,
		LoginContainerComponent,
	],
	imports: [AngularModules, MaterialModules, UIModules],
	providers: [
		{
			provide: 'AuthService',
			useFactory: authServiceProviderFactory,
		},
		{
			provide: 'EventService',
			useFactory: eventServiceProviderFactory,
		},
		{
			provide: 'UserService',
			useFactory: userServiceProviderFactory,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
