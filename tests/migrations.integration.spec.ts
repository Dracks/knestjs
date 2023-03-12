import {Test, TestingModule} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import * as path from 'path'
import {promises as fs} from 'fs'

import {KnestModule, MigrationsService} from '../src'
import { UserModel } from './models/user.model'
import { GroupModel } from './models/group.model'
import {oldSnapshot1} from './mocks/previous-version'

import 'reflect-metadata'

const migrationsFolder = path.join(__dirname, 'migrations');
const snapshotName = 'db-status.snapshot'

const getSnapshot = async ()=>{
    const contents = await fs.readFile(path.join(migrationsFolder,snapshotName))
    return JSON.parse(contents.toString())
}

const getMigrations = async (version: number)=>{
    const code = `0000000${version}`.substr(-7)
    const buffer = await fs.readFile(path.join(migrationsFolder, `${code}-new-migration.js`))
    return buffer.toString()
}

describe('Integration tests of migrations', ()=>{
    let app!: INestApplication;

    describe('makemigrations', ()=>{
        beforeEach(async ()=>{
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [KnestModule.forRoot({
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
                }),
                KnestModule.forFeature([UserModel])
            ],
            }).compile();

            app = moduleFixture.createNestApplication();
        })

        afterEach(async ()=>{
            await fs.rm(migrationsFolder, {recursive: true})
            await app.close()
        })

        it('New database from 0', async ()=>{
            await app.init()

            expect(app).toBeTruthy()

            await app.get(MigrationsService).makeMigrations()

            expect(await getSnapshot()).toMatchSnapshot()
            expect(await getMigrations(1)).toMatchSnapshot()
        })

        it('From an existing database', async ()=>{
          await fs.mkdir(migrationsFolder)
          await fs.writeFile(path.join(migrationsFolder, snapshotName), JSON.stringify(oldSnapshot1))
          await app.init()

          expect(app).toBeTruthy()

          await app.get(MigrationsService).makeMigrations()

          expect(await getSnapshot()).toMatchSnapshot()
          expect(await getMigrations(2)).toMatchSnapshot()
        })

        it('Multiple tables from 0', async ()=>{
            app.get(MigrationsService).registerModels([GroupModel])

            await app.init()

            expect(app).toBeTruthy()

            await app.get(MigrationsService).makeMigrations()

            expect(await getSnapshot()).toMatchSnapshot()
            expect(await getMigrations(1)).toMatchSnapshot()

        })
    })

})
