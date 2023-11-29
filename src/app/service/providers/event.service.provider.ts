import { environment } from 'src/environments/environment';
import { EventService } from '../service/api/event.service';
import { EventMockService } from '../service/mock/event.mock.service';

export function eventServiceProviderFactory() {
	return environment.isMock ? new EventMockService() : new EventService();
}
