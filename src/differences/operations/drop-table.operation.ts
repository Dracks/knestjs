import { TableSnapshot } from '../../table.types'
import {Operation} from './operation.type'

export class DropTable implements Operation{
    constructor(readonly tableInfo: TableSnapshot){}

    apply(){
        return `dropTable(${JSON.stringify(this.tableInfo.name)})`
    }
}
