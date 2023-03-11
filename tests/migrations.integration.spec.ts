import {Test, TestingModule} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import * as path from 'path'
import {promises as fs} from 'fs'

import {KnestModule, MigrationsService} from '../src'
import { UserModel } from './models/user.model'
import {oldSnapshot1} from './mocks/previous-version'

import 'reflect-metadata'

const migrationsFolder = path.join(__dirname, 'migrations');
const snapshotName = 'db-status.snapshot'

const getSnapshot = async ()=>{
    const contents = await fs.readFile(path.join(migrationsFolder,snapshotName))
    return JSON.parse(contents.toString())
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
        })

        it('New database from 0', async ()=>{
            await app.init()

            expect(app).toBeTruthy()

            await app.get(MigrationsService).makeMigrations()

            expect(await getSnapshot()).toMatchSnapshot()
        })

        it('From an existing database', async ()=>{
          await fs.mkdir(migrationsFolder)
          await fs.writeFile(path.join(migrationsFolder, snapshotName), JSON.stringify(oldSnapshot1))
          await app.init()

          expect(app).toBeTruthy()

          await app.get(MigrationsService).makeMigrations()

          expect(await getSnapshot()).toMatchSnapshot()
        })
    })

})
