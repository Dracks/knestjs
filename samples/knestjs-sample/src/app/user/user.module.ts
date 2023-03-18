import {Module, Injectable} from '@nestjs/common'
import {KnestModule} from '@knestjs/core'
import {UserModel} from './user.model'
import { UserController } from './user.controller'


@Module({
    imports: [KnestModule.forFeature([UserModel])],
    controllers: [UserController]
})
export class UserModule{}
