import { Model } from 'mongoose';
import { User } from "src/entity/user";
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    insertUser(email: string): Promise<string>;
    allUsers(): Promise<{
        id: string;
        email: string;
    }[]>;
}
