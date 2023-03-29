import { BaseColumnSnapshot, CharColumnSnapshot, ColumnSnapshot, DateTimeColumnSnapshot, IntColumnSnapshot } from "../../migrations/snapshot.types";
import { match } from "ts-pattern";
import { Operation } from "./operation.type";


export abstract class AbstractColumn<R, T extends BaseColumnSnapshot<R>> implements Operation {
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
export class IntColumn<T> extends AbstractColumn<T,IntColumnSnapshot<T>>{
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

export class CharColumn<T> extends AbstractColumn<T,CharColumnSnapshot<T>>{
    protected getColumn(): string {
        return `string(${this.serializedName}, ${this.column.length})`
    }
}

export class DateTimeColumn<T> extends AbstractColumn<T,DateTimeColumnSnapshot<T>>{
    protected getColumn(): string {
        return `datetime(${this.serializedName})`
    }
}

export class TimeColumn<T> extends AbstractColumn<T,DateTimeColumnSnapshot<T>>{
    protected getColumn(): string {
        return `time(${this.serializedName})`
    }
}

export class DateColumn<T> extends AbstractColumn<T,DateTimeColumnSnapshot<T>>{
    protected getColumn(): string {
        return `date(${this.serializedName})`
    }
}

export class AddColumn {
    static create<T>(column: ColumnSnapshot<T>){
        return match(column.type)
            .with("int", ()=>new IntColumn(column as IntColumnSnapshot<T>))
            .with('char', 'varchar', ()=>new CharColumn(column as CharColumnSnapshot<T>))
            .with('date', ()=> new DateColumn(column as DateTimeColumnSnapshot<T>))
            .with('time', ()=> new TimeColumn(column as DateTimeColumnSnapshot<T>))
            .with('datetime', ()=> new DateTimeColumn(column as DateTimeColumnSnapshot<T>))
            .otherwise(typeName=>{throw Error(`${typeName} not implemented yet!`)})
    }
}
