import {ColumnInfo} from './column.types'

export interface IndexInfo<T> {
    name?: string
    columns: Array<keyof T>
}

export interface TableSnapshot<T=unknown> {
    name: string,
    className: string,
    columns: ColumnInfo[],
    indexes: IndexInfo<T>[],
}


export interface TableConfig<T> {
    name?: string
    indexes?: Array<IndexInfo<T>>
}
