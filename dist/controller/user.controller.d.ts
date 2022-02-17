import { UserService } from "src/service/user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addUser(email: string): Promise<{
        id: string;
    }>;
    allUsers(): Promise<{
        id: string;
        email: string;
    }[]>;
}
