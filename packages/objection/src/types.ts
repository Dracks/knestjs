import { Model, QueryBuilderType, TransactionOrKnex } from "objection";

export type Repository<T> ={
    query(
        trxOrKnex?: TransactionOrKnex
    ): QueryBuilderType<T & Model>;
}
