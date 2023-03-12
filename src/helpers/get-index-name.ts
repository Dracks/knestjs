import { IndexInfo } from "table.types";

export const getIndexName = <T=unknown>(idxInfo: IndexInfo<T>) : string => {
    return idxInfo.name ?? `idx_${idxInfo.properties.join("_")}`
}
