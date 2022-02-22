import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/auth/entity/user.model';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() user: User): Promise<User> {
        return await this.authService.registerAccount(user);
    }

    @Post('login')
    async login(@Body() user: User): Promise<{ token: string }> {
        const token = await this.authService.login(user);
        return { token: token };
    }
}
