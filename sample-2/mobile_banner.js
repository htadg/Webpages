var bannerHolder = document.querySelector('.banner');
var widths = [];
var heights = [];
var counter = 0;
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

function updateLengths(count) {
  var totalX = window.innerWidth;
  var amplitude = 10;
  var meanY = window.innerHeight / 5;
  var cycles = 6.25;
  var limiter = totalX / cycles;
  for(var i=0; i<=totalX; ++i)
    heights[i] = Math.floor(Math.sin(i/limiter + count)*amplitude + meanY);
  return count;
}

function changeShape(){
    counter = updateLengths(++counter);
    pathStr = 'M0 0';
    for(var i=0; i<window.innerWidth; i++){
        pathStr +=' L'+i+' '+heights[i];
    }
    pathStr +=' L'+window.innerWidth+' 0 Z';
    path.setAttribute('d', pathStr);
}

function createBanner(){
    path.setAttribute('stroke','rgb(48, 3, 66)');
    path.setAttribute('fill','url(#grad1)');
    path.setAttribute('stroke-width', '1');
    changeShape();
    svg.appendChild(path);
    bannerHolder.appendChild(svg);
}

createBanner();
setInterval(changeShape, 500);
