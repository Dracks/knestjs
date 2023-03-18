"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModel = void 0;
var src_1 = require("../../src");
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    __decorate([
        (0, src_1.Column)({
            type: 'int',
            nullable: false,
            primaryKey: true,
            autoincrement: true
        })
    ], UserModel.prototype, "id");
    __decorate([
        (0, src_1.Column)({
            type: 'varchar',
            length: 255,
            nullable: false
        })
    ], UserModel.prototype, "user");
    __decorate([
        (0, src_1.Column)({
            type: 'char',
            length: 51,
            nullable: true
        })
    ], UserModel.prototype, "password");
    __decorate([
        (0, src_1.Column)({
            type: 'int',
            nullable: true
        })
    ], UserModel.prototype, "age");
    __decorate([
        (0, src_1.Column)({
            type: 'datetime',
            nullable: false
        })
    ], UserModel.prototype, "created");
    UserModel = __decorate([
        (0, src_1.Table)({
            indexes: [{ properties: ['user'], name: 'user_idx' }]
        })
    ], UserModel);
    return UserModel;
}());
exports.UserModel = UserModel;
