import { KNEST_COLUMNS_INFO } from "../constants";
import { KNEST_TABLE_INFO } from "../constants";
import { ColumnInfo } from "../decorators/column.decorator";
import { TableArg } from "../decorators/table.decorator";
import { Constructor } from "type-fest";
import { ColumnSnapshot, IndexSnapshot, TableSnapshot } from "./snapshot.types";
import { getTableName } from "../helpers/get-table-name";
import { getIndexName } from "../helpers/get-index-name";

export class TableSnapshotFactory<T> {
    readonly name: string
    readonly propertyColumnMap = new Map<keyof T, string>
    readonly tableMetadata : TableArg<T>
    readonly columns: ColumnSnapshot<T>[]


  constructor(readonly model: Constructor<T>){
      this.name = getTableName<T>(model)
      this.tableMetadata = Reflect.getMetadata(KNEST_TABLE_INFO, model) ?? {};
      const columns : ColumnInfo<T>[]= Reflect.getMetadata(KNEST_COLUMNS_INFO, model) ?? [];
      this.columns = columns.map(column => ({name: column.property as string, ...column}))
      this.propertyColumnMap = new Map(this.columns.map(({property, name})=>[property, name]))
  }

  buildIndexes(): IndexSnapshot[]{
      const indexesInfo = (this.tableMetadata.indexes ?? [])
      const indexes : IndexSnapshot[] = indexesInfo.map(idx => ({
          name: getIndexName(idx),
          columns: idx.properties.map(property => this.propertyColumnMap.get(property))
      }))
      return indexes;
  }

  build(): TableSnapshot<T>{
      const {model} = this;
      return {
          name: this.name,
          className: model.name,
          columns: this.columns,
          indexes: this.buildIndexes()
      }

  }
}
