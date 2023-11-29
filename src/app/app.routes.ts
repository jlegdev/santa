import { Routes } from '@angular/router';
import { MainLayoutComponent } from './component/core/main-layout/main-layout.component';
import { AuthGuard } from './guard/auth.can-activate.guard';
import { LoggedRoutes } from './component/logged.routes';
import { LoginComponent } from './component/login/view/login.component';
import { RoutePathEnum } from './enum/route.path.enum';

export const AppRoutes: Routes = [
	{
		path: RoutePathEnum.LOGIN,
		component: LoginComponent,
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
