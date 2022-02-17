import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "src/controller/user.controller";
import { UserSchema } from "src/entity/user";
import { UserService } from "src/service/user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}