import { User } from './user.model.ts';
import { AuthData } from './auth-data.ts';

export class AuthService {
    private user: User;

    registerUser(authData: AuthData) {
        this.use = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
    }

    login(authData: AuthData) {
        this.use = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
    }

    logout() {
        this.user = null;
    }
}
