import { Routes } from '@angular/router';
import { MainLayoutComponent } from './component/core/main-layout/main-layout.component';
import { LoggedRoutes } from './component/logged.routes';
import { LoginContainerComponent } from './component/login/container/login-container.component';
import { RoutePathEnum } from './enum/route.path.enum';
import { AuthGuard } from './guard/auth.can-activate.guard';

export const AppRoutes: Routes = [
	{
		path: RoutePathEnum.LOGIN,
		component: LoginContainerComponent,
		// title: RouteTitleMap.get(RoutePathEnum.LOGIN),
	},
	{
		path: '',
		component: MainLayoutComponent,
		canActivate: [AuthGuard],
		children: LoggedRoutes,
		// title: RouteTitleMap.get(RoutePathEnum.HOME),
	},
	{
		path: '**',
		redirectTo: RoutePathEnum.LOGIN,
		// title: RouteTitleMap.get(RoutePathEnum.LOGIN),
	},
];
