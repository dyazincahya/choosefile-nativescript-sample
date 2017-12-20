/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

require("./bundle-config");
var application = require("application");

var nativescript_fonticon_1 = require('nativescript-fonticon');
var sidedrawer_1 = require('./sidedrawer/sidedrawer');

nativescript_fonticon_1.TNSFontIcon.debug = false;
nativescript_fonticon_1.TNSFontIcon.paths = {
    'fa': 'font-awesome.css',
  	'ion': 'ionicons.css'
};
nativescript_fonticon_1.TNSFontIcon.loadCss();

var resources = application.getResources();
resources['fonticon'] = nativescript_fonticon_1.fonticon;
resources['isActive'] = sidedrawer_1.isActive;
application.setResources(resources);

// application.start({ moduleName: "main-page" });
application.start({ moduleName: "main-page" });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
