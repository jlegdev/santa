import { environment } from 'src/environments/environment';
import { AuthService } from '../api/auth.service';
import { AuthMockService } from '../mock/auth.mock.service';
import { StorageService } from '../utils/storage.service';
export function authServiceProviderFactory() {
	return environment.isMock ? new AuthMockService(new StorageService()) : new AuthService();
}
