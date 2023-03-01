import { Controller, Get, Inject, OnModuleInit } from "@nestjs/common";
import { Knex } from "knex";
import { KNEX_INSTANCE } from '@knestjs/core'
import { UserModel } from "./user.model";

@Controller('users')
export class UserController{
    constructor(@Inject(KNEX_INSTANCE) readonly knex: Knex){}

    @Get('list')
    listUsers(){
        return this.knex.select<UserModel>().from('user')
    }
}
