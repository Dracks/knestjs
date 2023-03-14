
import { ColumnSnapshot } from "../../migrations/snapshot.types";
import { Operation } from "./operation.type";

export class DropColumn<T> implements Operation {
    constructor(private readonly column: ColumnSnapshot<T>){}

    apply(): string {
        return `dropColumn(${JSON.stringify(this.column.name)})`
    }
}
