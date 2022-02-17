import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from "src/entity/user";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async insertUser(email: string) {
        const newUser = new this.userModel({ email })
        const result = await newUser.save();
        return result.id as string;
    }

    async allUsers() {
        const users = await this.userModel.find().exec();
        return users.map(user => ({
            id: user.id,
            email: user.email
        }))
    }
}