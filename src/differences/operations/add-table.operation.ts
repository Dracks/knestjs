import {Operation} from './operation.type'
import { TableSnapshot } from '../../table.types'
import { AddColumn } from './add-column.operation'
import { AbstractTableOperation } from './abstract-table.operation'

export class AddTable extends AbstractTableOperation implements Operation{
    constructor(readonly tableInfo: TableSnapshot){
      super()
    }

    getNewColumns(): Operation[]{
        return this.tableInfo.columns.map(column => AddColumn.create(column))
    }

    protected getInternalChanges(): Operation []{
      return this.getNewColumns()
    }

    apply(){
        const internalChanges = this.getNewColumns()
        return `createTable(${JSON.stringify(this.tableInfo.name)}, ${this.applyInternalChanges()})`
    }
}
