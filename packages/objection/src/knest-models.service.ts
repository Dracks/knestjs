import {Injectable, OnModuleInit, Inject} from '@nestjs/common'
import {MigrationsService, TableSnapshotFactory} from '@knestjs/core'
import { KNEST_OBJECTION_MODELS } from './constants'

@Injectable()
export class KnestModelsService implements OnModuleInit{

    constructor(@Inject(KNEST_OBJECTION_MODELS) readonly models: TableSnapshotFactory<unknown>[], readonly migrationsService: MigrationsService){
    }


    onModuleInit(){
        this.migrationsService.registerModels(this.models)
    }
}
