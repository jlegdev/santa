export enum RoutePathEnum {
	HOME = 'home',
	LOGIN = 'login',
	EVENT_JOIN = 'event/join',
	EVENT_LIST = 'event/list',
	EVENT_VIEW = 'event/view/:id',
}

export const RouteTitleMap: Map<RoutePathEnum, string> = new Map<RoutePathEnum, string>([
	[RoutePathEnum.HOME, 'Home'],
	[RoutePathEnum.LOGIN, 'Login'],
	[RoutePathEnum.EVENT_JOIN, 'Event join'],
	[RoutePathEnum.EVENT_LIST, 'Event list'],
	[RoutePathEnum.EVENT_VIEW, 'Event view'],
]);
