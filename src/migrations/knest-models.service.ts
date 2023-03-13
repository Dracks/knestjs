import {Injectable, OnModuleInit, Inject} from '@nestjs/common'
import {Constructor} from 'type-fest'
import {KNEST_MODELS} from '../constants'
import {MigrationsService} from './migrations.service'

@Injectable()
export class KnestModelsService implements OnModuleInit{

    constructor(@Inject(KNEST_MODELS) readonly models: Constructor<unknown>[], readonly migrationsService: MigrationsService){
    }


    onModuleInit(){
        this.migrationsService.registerModels(this.models)
    }
}
