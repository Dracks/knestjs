import { DynamicModule, Module } from "@nestjs/common";
import { KnestModule, TableSnapshotFactory } from '@knestjs/core'
import {Class} from 'type-fest'
import { KNEST_OBJECTION_MODELS } from "./constants";
import { KnestModelsService } from "./knest-models.service";
import { getTableProvider } from "./get-table-provider";

@Module({
    providers: [KnestModelsService]
})
export class KnestObjectionModule {
    static forRoot = KnestModule.forRoot;

    static forFeature(models: Class<object>[]): DynamicModule{
        const snapshotFactories = models.map(model => new TableSnapshotFactory(model))
        return {
            module: KnestObjectionModule,
            providers: [
                {provide: KNEST_OBJECTION_MODELS, useValue: snapshotFactories},
                //...models.map(getTableProvider)
                ...snapshotFactories.map(snapshot => getTableProvider(snapshot))
            ]
        }
    }
}
