import {Operation} from './operation.type'
import { TableSnapshot } from '../../table.types'
import { AddColumn } from './add-column.operation'
import { AbstractTableOperation } from './abstract-table.operation'
import { AddIndex } from './add-index.operation'

export class AddTable extends AbstractTableOperation implements Operation{
    constructor(readonly tableInfo: TableSnapshot){
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
        const internalChanges = this.getNewColumns()
        return `createTable(${JSON.stringify(this.tableInfo.name)}, ${this.applyInternalChanges()})`
    }
}
