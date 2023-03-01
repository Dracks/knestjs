import { BaseColumnSnapshot, CharColumnSnapshot, ColumnInfo, IntColumnSnapshot, DateTimeColumnSnapshot } from "../../column.types";
import { match } from "ts-pattern";
import { Operation } from "./operation.type";


export abstract class AbstractColumn<T extends BaseColumnSnapshot> implements Operation {
    protected serializedName: string

    constructor(protected readonly column: T){
        this.serializedName = JSON.stringify(this.column.name)
    }

    protected getChained(): string[]{
        const columnInfo  = this.column;
        const ret : string[] = [columnInfo.nullable ? 'nullable()': 'notNullable()']
        if (columnInfo.default !== undefined){
            ret.push(`defaultTo(${typeof columnInfo.default === 'number'? columnInfo.default: JSON.stringify(columnInfo.default)})`)
        }

        if(columnInfo.unique){
            ret.push(`unique()`)
        }

        return ret;
    }

    protected abstract getColumn(): string;

    apply(): string{
        return [this.getColumn(), ...this.getChained()].join('.')
    }
}
export class IntColumn extends AbstractColumn<IntColumnSnapshot>{
      protected getColumn(){
          return `integer(${this.serializedName})`
      }

      apply(): string {
          if (this.column.autoincrement){
              return `increments(${this.serializedName})`
          }
          return super.apply()
      }
}

export class CharColumn extends AbstractColumn<CharColumnSnapshot>{
    protected getColumn(): string {
        return `string(${this.serializedName}, ${this.column.length})`
    }
}

export class DateTimeColumn extends AbstractColumn<DateTimeColumnSnapshot>{
    protected getColumn(): string {
        return `datetime(${this.serializedName})`
    }
}

export class TimeColumn extends AbstractColumn<DateTimeColumnSnapshot>{
    protected getColumn(): string {
        return `time(${this.serializedName})`
    }
}

export class DateColumn extends AbstractColumn<DateTimeColumnSnapshot>{
    protected getColumn(): string {
        return `date(${this.serializedName})`
    }
}

export class AddColumn {
    static create(column: ColumnInfo){
        return match(column.type)
            .with("int", ()=>new IntColumn(column as IntColumnSnapshot))
            .with('char', 'varchar', ()=>new CharColumn(column as CharColumnSnapshot))
            .with('date', ()=> new DateColumn(column as DateTimeColumnSnapshot))
            .with('time', ()=> new TimeColumn(column as DateTimeColumnSnapshot))
            .with('datetime', ()=> new DateTimeColumn(column as DateTimeColumnSnapshot))
            .otherwise(typeName=>{throw Error(`${typeName} not implemented yet!`)})
    }
}
