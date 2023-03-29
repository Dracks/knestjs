
export type ColumnType = 'int' | 'float' | 'double' | 'char' | 'varchar' | 'text' | 'date' | 'datetime' | 'time'


export interface IntColumnConfig  {
    type: 'int'
    autoincrement?: boolean
}

export interface FloatColumnConfig  {
    type: 'float',
    precision: number,
    scale: number
}

export interface CharColumnConfig {
    type: 'char' | 'varchar'
    length: number
}

export interface DateTimeColumnConfig {
    type: 'datetime' | 'date' | 'time'
}
