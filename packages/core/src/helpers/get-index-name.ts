import { IndexInfo } from "../decorators/table.decorator"

export const getIndexName = <T=unknown>(idxInfo: IndexInfo<T>) : string => {
    return idxInfo.name ?? `idx_${idxInfo.properties.join("_")}`
}
