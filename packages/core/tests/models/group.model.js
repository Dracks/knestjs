"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupModel = void 0;
var src_1 = require("../../src");
var GroupModel = /** @class */ (function () {
    function GroupModel() {
    }
    __decorate([
        (0, src_1.Column)({
            type: 'int',
            nullable: false,
            primaryKey: true,
            autoincrement: true
        })
    ], GroupModel.prototype, "id");
    __decorate([
        (0, src_1.Column)({
            type: 'varchar',
            length: 255,
            nullable: false
        })
    ], GroupModel.prototype, "name");
    __decorate([
        (0, src_1.Column)({
            type: 'char',
            length: 51,
            nullable: false,
            name: 'role'
        })
    ], GroupModel.prototype, "privileges");
    __decorate([
        (0, src_1.Column)({
            type: 'datetime',
            nullable: false
        })
    ], GroupModel.prototype, "created");
    GroupModel = __decorate([
        (0, src_1.Table)({
            indexes: [{ properties: ['privileges'] }]
        })
    ], GroupModel);
    return GroupModel;
}());
exports.GroupModel = GroupModel;
