import { Constructor, Class } from 'type-fest';
import {KNEST_COLUMNS_INFO} from '../constants'
import { ColumnInfo, ColumnConfig } from '../column.types'

// export type PropertyDecorator<T> = <TCtor extends Constructor<T>>(target: TCtor, key: string)=>void

export const Column = (config: ColumnConfig) => (target: object, property: string)=>{
    const columns : ColumnInfo[] = Reflect.getMetadata(KNEST_COLUMNS_INFO, target.constructor) ?? [];
    if (columns.findIndex((p: ColumnInfo) => p.property === property)>=0){
        throw new Error(`A property cannot be decorated two times, check ${(target as {name: string}).name}.${property}`)
    }
    columns.push({
        ...config,
        property
    })
    Reflect.defineMetadata(KNEST_COLUMNS_INFO, columns, target.constructor)
}

export const ColumnNullable = <T extends ColumnConfig>(config: Omit<T, 'nullable' | 'primaryKey'>) => Column({...config, nullable: true} as T)
export const ColumnNotNull = <T extends ColumnConfig>(config: Omit<T, 'nullable'>) => Column({...config, nullable: false} as T)
