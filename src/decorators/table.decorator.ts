import { KNEST_TABLE_INFO, KNEST_COLUMNS_INFO} from '../constants'
import { Constructor } from 'type-fest';
import {TableConfig} from '../table.types'


export type ClassDecorator<T> = <TCtor extends Constructor<T>>(target: TCtor) => TCtor

export const Table = <T>(config?: TableConfig<T>):ClassDecorator<T> =>  (target) => {
    Reflect.defineMetadata(KNEST_TABLE_INFO, config, target)
    return target
}
