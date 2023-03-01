import { ColumnInfo } from "../../column.types";
import { Operation } from "./operation.type";

export class DropColumn implements Operation {
    constructor(private readonly column: ColumnInfo){}

    apply(): string {
        return `dropColumn(${JSON.stringify(this.column.name)})`
    }
}
