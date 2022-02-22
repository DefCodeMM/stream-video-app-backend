import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/auth/entity/user';


@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>, private jwtService: JwtService) { }

    registerAccount(user: User): Observable<User> {
        const { email, password } = user;

        return this.hashPassword(password).pipe(
            switchMap((hashedPassword: string) => {
                return from(new this.userModel({ email, password: hashedPassword }).save());
            }),
        ).pipe(
            map((user: User) => {
                delete user.password;
                return user;
            })
        );
    }

    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password, 12));
    }

    login(user: User): Observable<string> {
        const { email, password } = user;
        return this.validateUser(email, password).pipe(
            switchMap((user: User) => {
                if (user) {
                    return from(this.jwtService.signAsync({ user }))
                }
            })
        );
    }

    validateUser(email: string, password: string): Observable<User> {
        return from(this.userModel.findOne({ email }).select('+password')).pipe(
            switchMap((user: User) =>
                from(bcrypt.compare(password, user.password)).pipe(
                    map((isValidePassword: boolean) => {
                        if (isValidePassword) {
                            delete user.password;
                            return user;
                        }
                    })
                )
            )
        )
    }
}
