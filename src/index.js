/*
* @Author: Daniel Johnson
* @File: index.js
* @Date: 8-11-2020
* @breif: This file handles user interaction & P5 functions
*/

/* MIGHT ADD AT SOME POINT
* better mobile layout
*/
new p5();
let startTime = performance.now();
document.addEventListener('DOMContentLoaded', (event) => {
    let endTime = performance.now();
    console.log("DOM fully loaded in " + (endTime - startTime).toFixed(2) + " ms");
});

var currentGrid = new gridWrapper(25);

//P5 Functions
function setup() {
    let cnv = createCanvas(document.getElementById('canvasContainer').offsetWidth, document.getElementById('canvasContainer').offsetHeight);
    cnv.parent("canvasContainer");
    resetCanvas(currentGrid.numRows);
    let endTime = performance.now();
    console.log("P5 fully setup in " + (endTime - startTime).toFixed(2) + " ms");

    //modal tutorial setup
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("tutorial");
    var modal2 = document.getElementById("tutorial2");
    var modal3 = document.getElementById("tutorial3");
    var modal4 = document.getElementById("tutorial4");
    var modal5 = document.getElementById("tutorial5");
    span.onclick = function(){
        modal.style.display = "none";
    }
    window.onclick = function(event){
        if (event.target == modal || event.target == modal2 || event.target == modal3 || event.target == modal4 || event.target == modal5){
            modal.style.display = "none";
            modal2.style.display = "none";
            modal3.style.display = "none";
            modal4.style.display = "none";
            modal5.style.display = "none";
        }
    }
}
function draw() {
}
function windowResized() {
    resetCanvas(currentGrid.numRows);
}
function mousePressed(){
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && !currentGrid.animating){
        if (currentGrid.startSelected == true){
            fillInSpace(mouseButton, true, false);
        }
        else if (currentGrid.endSelected == true){
            fillInSpace(mouseButton, false, true);
            }
        else if (document.getElementById('tutorial').style.display == "none"
            && document.getElementById('tutorial2').style.display == "none" && document.getElementById('tutorial3').style.display == "none"
            && document.getElementById('tutorial4').style.display == "none" && document.getElementById('tutorial5').style.display == "none"){
            fillInSpace(mouseButton, false, false);
        }
    }
    
}
function mouseDragged(){
    if (document.getElementById('tutorial').style.display == "none" && !currentGrid.animating
    && document.getElementById('tutorial2').style.display == "none" && document.getElementById('tutorial3').style.display == "none"
    && document.getElementById('tutorial4').style.display == "none" && document.getElementById('tutorial5').style.display == "none"){
        fillInSpace(mouseButton, false, false);
    }
}
function touchStarted(){
    mousePressed();
}
function touchMoved(){
    mouseDragged();
}

//Other Functions
function fillInSpace(mouseButton, startCall, endCall){
    strokeWeight(0.25);
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height){
        let effectiveY = floor(mouseY/(height/currentGrid.numRows));
        let effectiveX = floor(mouseX/(height/currentGrid.numRows));
        if (currentGrid.getEntry(effectiveY, effectiveX) == "Open"){
            if (startCall){
                currentGrid.markSpotAsStart(effectiveY, effectiveX);
                cursor('default');
            }
            else if (endCall){
                currentGrid.markSpotAsEnd(effectiveY, effectiveX);
                cursor('default');
            }
            else if (mouseButton === LEFT){
                currentGrid.markSpotAsWall(effectiveY, effectiveX);
            }
        }
        else if (!startCall && !endCall && mouseButton === RIGHT && currentGrid.getEntry(effectiveY, effectiveX) == "Wall"){
            currentGrid.unmarkSpot(effectiveY, effectiveX);
        }
    }
}
function drawGrid(){
    stroke('black');
    strokeWeight(0.25);
    for (let x = 0; x <= width; x += (height / currentGrid.numRows)) {
		for (let y = 0; y <= height; y += (height / currentGrid.numRows)) {
			line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
    line(width-1, 0, width-1, height);
    //noStroke();
}
function resetCanvas(rows){
    currentGrid = new gridWrapper(rows);
    resizeCanvas(document.getElementById('canvasContainer').offsetWidth, document.getElementById('canvasContainer').offsetHeight);
    background('#ecf0f1');
    drawGrid();
    document.getElementById("PlaceStart").innerHTML = "Place Start";
    document.getElementById("PlaceEnd").innerHTML = "Place End";
}
