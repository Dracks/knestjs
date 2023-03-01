
export type ColumnType = 'int' | 'float' | 'double' | 'char' | 'varchar' | 'text' | 'date' | 'datetime' | 'time'

export interface BaseColumnSnapshot {
    name?: string,
    type: ColumnType,
    default?: unknown,
    nullable: boolean,
    primaryKey?: boolean
    unique?: boolean
}

export interface IntColumnSnapshot extends BaseColumnSnapshot {
    type: 'int'
    autoincrement?: boolean
}

export interface FloatColumnSnapshot extends BaseColumnSnapshot {
    type: 'float',
    precision: number,
    scale: number
}

export interface CharColumnSnapshot extends BaseColumnSnapshot{
    type: 'char' | 'varchar'
    length: number
}

export interface DateTimeColumnSnapshot extends BaseColumnSnapshot{
    type: 'datetime' | 'date' | 'time'
}

export type ColumnConfig = IntColumnSnapshot | FloatColumnSnapshot | CharColumnSnapshot | DateTimeColumnSnapshot

export type ColumnInfo = ColumnConfig & {
    property: string
}
