"use strict";
var platformModule      = require("platform");
var frameModule         = require('ui/frame').topmost();
var permissionsModule   = require( "nativescript-permissions");

var bghttpModule        = require("nativescript-background-http");
var session             = bghttpModule.session("image-upload");

var observableModule    = require("data/observable").Observable;
var context             = new observableModule();

var page;


function selectionFile(){
    page.showModal("filemanager/file", "context", function (filepath) {
        if(filepath != null){
            var filename=filepath.split("/");
            filename=filename[filename.length-1];

            var url="http://";
            var request = {
                url: url,
                method: "POST",
                headers: {
                    'Authorization': 'the token',
                    'Content-Type': 'application/octet-stream',
                    "File-Name": filename,
                },
                description: "{ 'uploading': " + filename + " }"
            };
            var params=[{
                filename:filepath,
                name:"attachment",
                test:"ok",
                mimeType:"image/png"
            }];
            var task = session.multipartUpload(params, request);
            
            task.on("progress", logEvent);
            task.on("error", logEvent);
            task.on("complete", logEvent);
            task.on("responded", logEvent);

            function logEvent(e) {
                
            }
        }
    }, true);
}

exports.loaded = function(args){
    page = args.object;
    page.bindingContext = context;
}

exports.chooseFile = function(){
    if(platformModule.device.os === "Android" && platformModule.device.sdkVersion >= 23){   
        permissionsModule.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions to read from storage")
        .then(function() {
            console.log("Permissions granted!");
            selectionFile();
        })
        .catch(function() {
            console.log("Uh oh, no permissions - plan B time!");
        });
    }else{
        selectionFile();
    } 
}
