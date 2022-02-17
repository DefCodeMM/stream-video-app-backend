import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "src/service/user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async addUser(
        @Body('email') email: string
    ){
        const id = await this.userService.insertUser(email);
        return {id: id}
    }

    @Get()
    async allUsers() {
        const users = await this.userService.allUsers();
        return users;
    }
}