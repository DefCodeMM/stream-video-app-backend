import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/auth/entity/user.model';


@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>, private jwtService: JwtService) { }

    async registerAccount(user: User): Promise<User> {
        const { email, password } = user;
        const hashedPassword = await this.hashpassword(password);

        const newUser = await new this.userModel({ email, password: hashedPassword }).save();
        return { email: newUser.email, role: newUser.role } as User;
    }

    private hashpassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async login(user: User): Promise<string> {
        const { email, password } = user;
        const userValid = await this.authenticationUser(email, password);

        if (userValid) {
            return await this.jwtService.signAsync({ user });
        }
    }

    private async authenticationUser(email: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).select('+password').exec();
        const isValidePassword = await bcrypt.compare(password, user.password);

        if (isValidePassword) {
            return { email: user.email, role: user.role } as User;
        }
    }
}
