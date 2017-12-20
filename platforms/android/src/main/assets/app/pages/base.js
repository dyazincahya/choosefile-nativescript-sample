"use strict";
var observableModule    = require('data/observable');
var frameModule         = require('ui/frame');

var BaseModel = (function (_super) {
    __extends(BaseModel, _super);
    function BaseModel(page) {
        _super.call(this);
        this.page = page;
        this.actionicon = 'ic_menu_home';
    }
    BaseModel.prototype.goBack = function () {
        frameModule.topmost().goBack();
    };
    BaseModel.prototype.toggleSideDrawer = function (args) {
        var view = args.object;
        var sideDrawer = this.page.getViewById('sideDrawer');
        sideDrawer.toggleDrawerState();
    };
    BaseModel.prototype.openModal = function () {
        this.page.showModal('pages/modal', 'Custom ActionBar', function () {
        });
    };

    return BaseModel;
}(observableModule.Observable));
exports.BaseModel = BaseModel;
