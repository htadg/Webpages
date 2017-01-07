(function(funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    baseObj[funcName] = function(callback, context) {
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            readyList.push({fn: callback, ctx: context});
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    };
})("docReady", window);

var CSSFiles = ['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'];
var JSFiles = [];
var fileStructure = {};

var loadCSS = function(){
    CSSFiles.forEach(function(url){
        var link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        document.querySelector('head').appendChild(link);
    });
};

var loadJS = function() {
    JSFiles.forEach(function(url){
        var link = document.createElement('script');
        link.src = url;
        document.querySelector('body').appendChild(link);
    });
};

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    CSSFiles.push('style_mobile.min.css');
    CSSFiles.push('https://fonts.googleapis.com/css?family=Cookie');
    JSFiles.push('mobile_banner.min.js');
}else{
    CSSFiles.push('style.min.css');
}


loadCSS();
loadJS();

var onLoad = function(){
    setTimeout(function(){
        document.body.classList.toggle('loaded');
    }, 3000);
};

docReady(onLoad);
