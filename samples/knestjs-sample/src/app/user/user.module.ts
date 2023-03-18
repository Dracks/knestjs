import {Module} from '@nestjs/common'
import {UserModel} from './user.model'
import { UserController } from './user.controller'
import { KnestObjectionModule } from '@knestjs/objection'


@Module({
    imports: [KnestObjectionModule.forFeature([UserModel])],
    controllers: [UserController]
})
export class UserModule{}
