# `@knestjs/objection`

This is the implementation of [@knestjs](https://www.npmjs.com/package/@knestjs/core) using objection models as the object to do the queries.

## Usage

On the app module, you need to initialize KnestjsModule, you can use the static forRoot in knestObjection.
```typescript
@Module({
    imports: [
        KnestObjectionModule.forRoot({
            db: {
                client: 'sqlite3',
                connection: {
                    filename: ':memory:'
                },
                useNullAsDefault: true,
            },
            migrations: {
                folder: migrationsFolder,
                snapshotName,
            }
        })
    ]
})
export class AppModule {}
```

Then on the feature module, you need to register the models.
```typescript
@Module({
    imports: [KnestObjectionModule.forFeature([UserModel, GroupModel])]
})
export class UserModule {}
```
