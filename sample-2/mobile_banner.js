var bannerHolder = document.querySelector('.banner');
var widths = [];
var heights = [];
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var svgNS = svg.namespaceURI;
svg.setAttribute('width', Math.floor(window.innerWidth));
svg.setAttribute('height', Math.floor(window.innerHeight / 3));
svg.style.position = 'fixed';
svg.style.zIndex = -999;
svg.style.top = 0;
svg.style.left = 0;
var path = document.createElementNS(svgNS,'path');
var defs = document.createElementNS(svgNS, 'defs');
var linearGrad = document.createElementNS(svgNS, 'linearGradient');
linearGrad.setAttribute('id', 'grad1');
linearGrad.setAttribute('x1', '0%');
linearGrad.setAttribute('y1', '0%');
linearGrad.setAttribute('x2', '0%');
linearGrad.setAttribute('y2', '100%');
var stop1 = document.createElementNS(svgNS, 'stop');
var stop2 = document.createElementNS(svgNS, 'stop');
stop1.setAttribute('offset', '0%');
stop2.setAttribute('offset', '100%');
stop1.setAttribute('style', 'stop-color:rgb(113, 0, 159);stop-opacity:1');
stop2.setAttribute('style', 'stop-color:rgb(173, 0, 244);stop-opacity:1');
linearGrad.appendChild(stop1);
linearGrad.appendChild(stop2);
defs.appendChild(linearGrad);
svg.appendChild(defs);


var count = 0;

function updateLengths() {
    var _toleranceX = 100;
    var _toleranceY = 70;
    var expectedX = Math.floor(window.innerWidth / 5);
    var expectedY = 150 || Math.floor(window.innerHeight / 3);
    var startX = expectedX;
    var startY = expectedY;
    for(var i=1; i<=4; i++){
        widths[i-1] = (startX*i);
        heights[i-1] = (expectedY - Math.floor(_toleranceY*Math.random()));
    }
}

function changeShape(){
    updateLengths();
    pathStr = 'M0 0 L0 '+ Math.floor(150 - Math.random()*100) +' L'+widths[0]+' '+heights[0]+' L'+widths[1]+' '+heights[1]+' L'+widths[2]+' '+heights[2]+' L'+widths[3]+' '+heights[3]+' L'+window.innerWidth+' '+ Math.floor(150 - Math.random()*100) +' L'+window.innerWidth+' 0 Z';
    path.setAttribute('d', pathStr);
}

function createBanner(){
    path.setAttribute('stroke','rgb(48, 3, 66)');
    path.setAttribute('fill','url(#grad1)');
    path.setAttribute('stroke-width', '3');
    changeShape();
    svg.appendChild(path);
    console.log(svg);
    bannerHolder.appendChild(svg);
}

createBanner();
setInterval(changeShape, 3000);