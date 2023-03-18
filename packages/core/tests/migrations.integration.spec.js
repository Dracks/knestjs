"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var testing_1 = require("@nestjs/testing");
var path = require("path");
var fs_1 = require("fs");
var src_1 = require("../src");
var user_model_1 = require("./models/user.model");
var group_model_1 = require("./models/group.model");
var previous_version_1 = require("./mocks/previous-version");
require("reflect-metadata");
var migrationsFolder = path.join(__dirname, 'migrations');
var snapshotName = 'db-status.snapshot';
var getSnapshot = function () { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs_1.promises.readFile(path.join(migrationsFolder, snapshotName))];
            case 1:
                contents = _a.sent();
                return [2 /*return*/, JSON.parse(contents.toString())];
        }
    });
}); };
var getMigrations = function (version) { return __awaiter(void 0, void 0, void 0, function () {
    var code, buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = "0000000".concat(version).substr(-7);
                return [4 /*yield*/, fs_1.promises.readFile(path.join(migrationsFolder, "".concat(code, "-new-migration.js")))];
            case 1:
                buffer = _a.sent();
                return [2 /*return*/, buffer.toString()];
        }
    });
}); };
describe('Integration tests of migrations', function () {
    var app;
    describe('makemigrations', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var moduleFixture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                            imports: [src_1.KnestModule.forRoot({
                                    db: {
                                        client: 'sqlite3',
                                        connection: {
                                            filename: ':memory:'
                                        },
                                        useNullAsDefault: true
                                    },
                                    migrations: {
                                        folder: migrationsFolder,
                                        snapshotName: snapshotName
                                    }
                                }),
                                src_1.KnestModule.forFeature([user_model_1.UserModel])]
                        }).compile()];
                    case 1:
                        moduleFixture = _a.sent();
                        app = moduleFixture.createNestApplication();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.rm(migrationsFolder, { recursive: true })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, app.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('New database from 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, app.init()];
                    case 1:
                        _c.sent();
                        expect(app).toBeTruthy();
                        return [4 /*yield*/, app.get(src_1.MigrationsService).makeMigrations()];
                    case 2:
                        _c.sent();
                        _a = expect;
                        return [4 /*yield*/, getSnapshot()];
                    case 3:
                        _a.apply(void 0, [_c.sent()]).toMatchSnapshot();
                        _b = expect;
                        return [4 /*yield*/, getMigrations(1)];
                    case 4:
                        _b.apply(void 0, [_c.sent()]).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('From an existing database', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.mkdir(migrationsFolder)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, fs_1.promises.writeFile(path.join(migrationsFolder, snapshotName), JSON.stringify(previous_version_1.oldSnapshot1))];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, app.init()];
                    case 3:
                        _c.sent();
                        expect(app).toBeTruthy();
                        return [4 /*yield*/, app.get(src_1.MigrationsService).makeMigrations()];
                    case 4:
                        _c.sent();
                        _a = expect;
                        return [4 /*yield*/, getSnapshot()];
                    case 5:
                        _a.apply(void 0, [_c.sent()]).toMatchSnapshot();
                        _b = expect;
                        return [4 /*yield*/, getMigrations(2)];
                    case 6:
                        _b.apply(void 0, [_c.sent()]).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Multiple tables from 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        app.get(src_1.MigrationsService).registerModels([group_model_1.GroupModel]);
                        return [4 /*yield*/, app.init()];
                    case 1:
                        _c.sent();
                        expect(app).toBeTruthy();
                        return [4 /*yield*/, app.get(src_1.MigrationsService).makeMigrations()];
                    case 2:
                        _c.sent();
                        _a = expect;
                        return [4 /*yield*/, getSnapshot()];
                    case 3:
                        _a.apply(void 0, [_c.sent()]).toMatchSnapshot();
                        _b = expect;
                        return [4 /*yield*/, getMigrations(1)];
                    case 4:
                        _b.apply(void 0, [_c.sent()]).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
