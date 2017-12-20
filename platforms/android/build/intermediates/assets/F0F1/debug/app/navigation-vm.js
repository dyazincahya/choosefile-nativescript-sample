"use strict";
var frameModule     = require('ui/frame');
var baseMe          = require('./pages/base');

var NavigationViewModel = (function (_super) {
    __extends(NavigationViewModel, _super);
    function NavigationViewModel() {
        _super.apply(this, arguments);
    }
    
    return NavigationViewModel;
}(baseMe.BaseModel));
exports.NavigationViewModel = NavigationViewModel;
