"use strict";
var observable_1 = require('data/observable');
function onLoaded(args) {
    var page = args.object;
    page.bindingContext = new ModalDemo();
}
exports.onLoaded = onLoaded;
function onShownModally(args) {
    args.object.bindingContext.init({
        title: args.context,
        closeCallback: args.closeCallback
    });
}
exports.onShownModally = onShownModally;
var ModalDemo = (function (_super) {
    __extends(ModalDemo, _super);
    function ModalDemo() {
        _super.apply(this, arguments);
    }
    ModalDemo.prototype.init = function (data) {
        this.set('title', data.title);
        this._closeCallback = data.closeCallback;
    };
    ModalDemo.prototype.close = function () {
        this._closeCallback();
    };
    return ModalDemo;
}(observable_1.Observable));
