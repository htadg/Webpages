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

var CSSFiles = ["https://fonts.googleapis.com/css?family=Righteous", "style.min.css"];

var removeLoader = function() {
    var t = document.querySelector('.loader');
    t.style.opacity = '0';
    t.addEventListener('webkitTransitionEnd', function(){
        this.style.display = "none";
    });
};

var loadCSS = function(){
    CSSFiles.forEach(function(url){
        var link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        document.querySelector('head').appendChild(link);
    });
};


loadCSS();

var onLoad = function(){
    removeLoader();
};

docReady(onLoad);
