import {Operation} from './operation.type'
import { AddColumn } from './add-column.operation'
import { AbstractTableOperation } from './abstract-table.operation'
import { AddIndex } from './add-index.operation'
import { TableSnapshot } from '../../migrations/snapshot.types'

export class AddTable<T> extends AbstractTableOperation implements Operation{
    constructor(readonly tableInfo: TableSnapshot<T>){
      super()
    }

    getNewColumns(): Operation[]{
        return this.tableInfo.columns.map(column => AddColumn.create(column))
    }

    getNewIndexes(): Operation[]{
        return this.tableInfo.indexes.map(index => new AddIndex(index))
    }

    protected getInternalChanges(): Operation []{
      return [...this.getNewColumns(), ...this.getNewIndexes()]
    }

    apply(){
        return `createTable(${JSON.stringify(this.tableInfo.name)}, ${this.applyInternalChanges()})`
    }
}
