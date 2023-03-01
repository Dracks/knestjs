import { Operation } from "./operation.type";

export abstract class AbstractTableOperation implements Operation {
    protected abstract getInternalChanges(): Operation[]

    abstract apply():string

    applyInternalChanges(): string {
        return `(table) => {${this.getInternalChanges().map(c => `\n    table.${c.apply()};`).join('')}\n}`
    }
}
