import {Provider} from '@nestjs/common'
import {Knex} from 'knex'
import {Class} from 'type-fest'
import { KNEX_INSTANCE, TableSnapshotFactory } from '@knestjs/core'
import {KNEST_OBJECTION_MODEL} from './constants'
import { Model } from 'objection'

export const getModelKey =(model: Class<unknown>) => `${KNEST_OBJECTION_MODEL}_${model.name}`

export const getTableProvider=<T extends object>(snapshot: TableSnapshotFactory<T>):Provider<any> => {
    class ObjectionProvider extends Model {
        static get tableName(){
            return snapshot.name
        }
    }

    return {
        provide: getModelKey(snapshot.model),
        useFactory: (knex: Knex)=>{
            // Cannot do that, as requires the table
            // return knex(getTableName(model))
            ObjectionProvider.knex(knex)
            return ObjectionProvider
        },
        inject: [KNEX_INSTANCE]
    }
}
