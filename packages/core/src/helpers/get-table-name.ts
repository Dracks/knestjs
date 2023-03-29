import { KNEST_TABLE_INFO} from '../constants'
import {Constructor} from 'type-fest'
import { TableArg } from '../decorators/table.decorator';

export const getTableName = <T>(model: Constructor<T>):string => {
    const metadata: TableArg<T> = Reflect.getMetadata(KNEST_TABLE_INFO, model)
    const originalName = metadata?.name ?? model.name;

    return originalName
}
