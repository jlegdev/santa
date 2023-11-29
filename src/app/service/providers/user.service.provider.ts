import { environment } from 'src/environments/environment';
import { UserService } from '../service/api/user.service';
import { UserMockService } from '../service/mock/user.mock.service';

export function userServiceProviderFactory() {
	return environment.isMock ? new UserMockService() : new UserService();
}
