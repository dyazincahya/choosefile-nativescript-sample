"use strict";
var theNavigation           = require('../navigation-vm');

var platformModule          = require('platform');
var frameModule             = require('ui/frame');
var toastModule             = require("nativescript-toast");
var observableArrayModule   = require("data/observable-array");
var fsModule                = require("file-system");

var listview,context=[],myItems=[],curentpath="/";

function masuk(path){
    var documents = fsModule.Folder.fromPath(path);
    myItems=[];

    documents.eachEntity(function (entity) {
        var file = new java.io.File(entity.path);
        var extention=""; 
        if(file.isFile()){
            extention=file.getName().split(".");
            extention=extention[extention.length-1];
            if(extention=="jpg"){
                extention="image";
            }else{
                extention="file";
            } 
        }else{ 
            extention="folder";
        }
        myItems.push({
            title:file.getName(),
            isFile:file.isFile(),
            ext:extention,
            path:entity.path,
            read:file.canRead()
        });
    });
    var parentpath = new observableArrayModule.ObservableArray();    
    var pathlong="/";
    for(var i in path.split("/")){
        console.log("pathnya : "+path.split("/")[i]);
        var data="";
        if(path.split("/")[i]!=""){
            pathlong=pathlong+"/"+path.split("/")[i];
            data=({
                title:path.split("/")[i],
                path:pathlong
            });
            parentpath.push(data);
        }
    }
    pathlong="";
    context.set("myItemss",myItems);
    context.set("parentpaths",parentpath);
    listview.refresh();
}

exports.navigatingTo = function(args) {
    var page = args.object;
    if (platformModule.isIOS) {
        var controller = frameModule.topmost().ios.controller;
        var navigationBar = controller.navigationBar;
        navigationBar.barStyle = 0;
    }

    context = new theNavigation.NavigationViewModel(page);
    listview=page.getViewById("listview");
    masuk("/");
    page.bindingContext = context;
};

exports.insert = function(args){
    var item = args.view.bindingContext;
    if(item.read && item.ext=='folder'){
    	masuk(item.path);
    }else if(item.read && item.ext=='file'){
        closeCallback(item.path);
    }else if(item.read && item.ext=='image'){
        closeCallback(item.path);
    }else{
        var toast = toastModule.makeText("Can't read file");
        toast.show();
    }
}

exports.home = function(){
    masuk("/");
}

exports.loncat = function(args){
	var item = args.view.bindingContext;
    masuk(item.path);
}

var context1;
var closeCallback;
var page;
var usernameTextField;
var passwordTextField;

exports.onShownModally = function(args) {
    console.log("login-page.onShownModally, context: " + args.context);
    context1 = args.context;
    closeCallback = args.closeCallback;
};

exports.onLoaded = function(args) {
    page = args.object;
    context = new theNavigation.NavigationViewModel(page);
    listview=page.getViewById("listview");
    masuk("/");
    page.bindingContext = context;
};

exports.onUnloaded = function() {
    console.log("login-page.onUnloaded");
};

exports.onLoginButtonTap = function() {
    console.log("login-page.onLoginButtonTap");
    closeCallback(usernameTextField.text, passwordTextField.text);
};