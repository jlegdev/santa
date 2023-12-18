import { Routes } from '@angular/router';
import { RoutePathEnum, RouteTitleMap } from '../enum/route.path.enum';
import { EventCreateContainerComponent } from './event/event-create/container/event-create-container.component';
import { EventJoinContainerComponent } from './event/event-join/container/event-join-container.component';
import { EventListContainerComponent } from './event/event-list/container/event-list-container.component';
import { EventUpdateContainerComponent } from './event/event-update/container/event-update-container.component';
import { EventViewContainerComponent } from './event/event-view/container/event-view-container.component';
import { HomeContainerComponent } from './home/container/home-container.component';

export const LoggedRoutes: Routes = [
	{
		path: RoutePathEnum.HOME,
		component: HomeContainerComponent,
		// title: RouteTitleMap.get(RoutePathEnum.HOME),
	},
	{
		path: RoutePathEnum.EVENT_CREATE,
		component: EventCreateContainerComponent,
	},
	{
		path: RoutePathEnum.EVENT_LIST,
		component: EventListContainerComponent,
	},
	{
		path: RoutePathEnum.EVENT_JOIN,
		component: EventJoinContainerComponent,
	},
	{
		path: RoutePathEnum.EVENT_VIEW,
		component: EventViewContainerComponent,
	},
	{
		path: RoutePathEnum.EVENT_UPDATE,
		component: EventUpdateContainerComponent,
	},
	{
		path: '**',
		component: HomeContainerComponent,
		title: RouteTitleMap.get(RoutePathEnum.HOME),
	},
];
