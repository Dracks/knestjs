
import { TableSnapshot } from '../../migrations/snapshot.types'
import {Operation} from './operation.type'

export class DropTable<T> implements Operation{
    constructor(readonly tableInfo: TableSnapshot<T>){}

    apply(){
        return `dropTable(${JSON.stringify(this.tableInfo.name)})`
    }
}
