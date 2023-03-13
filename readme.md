# Knestjs
[![codecov](https://codecov.io/gh/Dracks/knestjs/branch/main/graph/badge.svg?token=5ZD6Q7O2HF)](https://codecov.io/gh/Dracks/knestjs)
[![CodeFactor](https://www.codefactor.io/repository/github/dracks/knestjs/badge)](https://www.codefactor.io/repository/github/dracks/knestjs)

Knestjs search to be a Nestjs ORM in which you write the models once and only once.
This is done creating migrations automatically from the models that you create.


## How to use it
1. Register the core module in your app module like so:
```TypeScript
@Module({
  imports: [
    KnestModule.forRoot({
         db: {
             client: 'sqlite3',
             connection: {
                 filename: ':memory:'
             },
             useNullAsDefault: true,
         },
         migrations: {
             folder: `${__dirname}/../../migrations`
         }
     }),
 ]
})
export class AppModule {}
```
This will configure knex with your db connection.

2. Create some model:
```TypeScript
@Table({
    tableName: 'user'
})
export class UserModel {
    @Column({
        type: 'int',
        autoincrement: true,
        nullable: false
    })
    id!: number

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    user!: string;
}
```

This will create a table with a column id, that is a number autoincrement, and a
column user of type varchar.

3. Register this models with `KneestModule.forFeature` at this moment this will
only register the models to be able of generate the migrations, but won't provide
any helper.
```TypeScript
KnestModule.forFeature([UserModel])
```

Now you can call to the `MigrationService.makeMigrations` to generate the migrations.
My recomendation is to use some package like nestjs-command as shown in the [example](./knestjs-sample/src/cli/cli.module.ts).

## Todo
The following list is the main points I will like to address to consider the library in version 1

* [x] creation and deletion of indexes
  * [x] Use change the property to the column name of indexes
* [ ] tools to access the models directly (Extra package using objection?)  
* [ ] Keep the ordering of the fields on modifications (Adding the after in the alter table)
* [ ] Add the option to generate the migrations in typescript
* [ ] Add the option to automatically change the properties and/or classes casing (f.e.: automatically transform to snake_case)
* [x] Split types for the declarations one that is the used in the interfaces, and another to work internally
* [ ] Handle column mutation
* [ ] Handle index mutation
* [ ] Handle partial indexes

As a general Idea, I will like to provide 3 packages, one is the current @knestjs/core, one should provide direct interface to knex to use it for doing the queries, and the third one should provide ObjectionJs
