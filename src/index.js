/*
* @Author: Daniel Johnson
* @File: index.js
* @Date: 8-11-2020
* @breif: This file implements pathfinding algorithms and visualizes
*         them with help from the p5.js library
*/

/*   TODO
* Make tutorial better
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
    span.onclick = function(){
        modal.style.display = "none";
    }
    window.onclick = function(event){
        if (event.target == tutorial){
            modal.style.display = "none";
        }
    }
}
function draw() {
}
function windowResized() {
    resetCanvas(currentGrid.numRows);
}
function mousePressed(){
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        if (currentGrid.startSelected == true){
            fillInSpace(false, true, false);
        }
        else if (currentGrid.endSelected == true){
            fillInSpace(false, false, true);
            }
        else if (currentGrid.ran == false && document.getElementById('tutorial').style.display == "none"){
            fillInSpace(false, false, false);
        }
    }
    
}
function mouseDragged(){
    if (currentGrid.ran == false && document.getElementById('tutorial').style.display == "none"){
        fillInSpace(true, false, false);
    }
}
function touchStarted(){
    mousePressed();
}
function touchMoved(){
    mouseDragged();
}

//Custom Functions
function buttonPressed(button){
    if (button.id == "ReduceRows" && currentGrid.numRows > 5){
        resetCanvas(currentGrid.numRows-5);
    }
    else if (button.id == "IncreaseRows" && currentGrid.numRows < 90){
        resetCanvas(currentGrid.numRows+5);
    }
    else if (button.id == "Reset"){
        resetCanvas(currentGrid.numRows);
    }
    else if (button.id == "RunAlgorithm"){
        if (currentGrid.startMade == true && currentGrid.endMade == true && currentGrid.ran == false){
            //let startTime = performance.now();
            let info;
            let alg = document.getElementById("ChangeAlgorithm");
            if (alg.innerHTML == "Change Algorithm: BFS"){
                info = BFS(currentGrid);
            }
            else {
                info = AStar(currentGrid);
            }
            let endTime = performance.now();
            var snackbar = document.getElementById("snackbar");
            if (info.dist != -1){
                snackbar.innerHTML = "This algorithm took " + info.time.toFixed(2) + " ms to compute a distance of " + info.dist + " units";
            }
            else{
                snackbar.innerHTML = "This algorithm took " + info.time.toFixed(2) + " ms to realize that there is no solution";
            }
            currentGrid.ran = true;
            snackbar.className = "show";
            setTimeout(function(){snackbar.className = snackbar.className.replace("show", "")}, 5000);
        }
        else if (currentGrid.startMade == false || currentGrid.endMade == false){
            alert("Make sure to set a start and end before running the algorithm.")
        }
    }
    else if (button.id == "PlaceStart"){
        if (currentGrid.startMade == false){
            cursor('images/start.png', 10, 10);
            currentGrid.startSelected = true;
        }
        else {
            alert("Start has already been made, press 'Reset' to start a new board.");
        }
    }
    else if (button.id == "PlaceEnd"){
        if (currentGrid.endMade == false){
            cursor('images/end.png', 10, 10);
            currentGrid.endSelected = true;
        }
        else{
            alert("End has already been made, press 'Reset' to start a new board.");
        }
    }
    else if (button.id == "GenerateMaze"){
        resetCanvas(currentGrid.numRows);
        generateMazePrim(currentGrid);
    }
    else if (button.id == "ChangeAlgorithm"){
        if (button.innerHTML == "Change Algorithm: BFS"){
            button.innerHTML = "Change Algorithm: A*";
        }
        else{
            button.innerHTML = "Change Algorithm: BFS";
        }
    }
}
function fillInSpace(dragged, startCall, endCall){
    for(let x = 0; x < width; x += height/currentGrid.numRows){
        for (let y = 0; y < height - 1; y += height/currentGrid.numRows){
            if (mouseX > x && mouseX <= x + height/currentGrid.numRows
                && mouseY > y && mouseY <= y + height/currentGrid.numRows){

                let effectiveY = floor(mouseY/(height/currentGrid.numRows));
                let effectiveX = floor(mouseX/(height/currentGrid.numRows));
                if (currentGrid.getEntry(effectiveY, effectiveX) == "Open"){
                    if (startCall && !currentGrid.startMade){
                        currentGrid.markSpotAsStart(effectiveY, effectiveX);
                        cursor('default');
                    }
                    else if (endCall && !currentGrid.endMade){
                        currentGrid.markSpotAsEnd(effectiveY, effectiveX);
                        cursor('default');
                    }
                    else if (!startCall && !endCall){
                        currentGrid.markSpotAsWall(effectiveY, effectiveX);
                    }
                }
                else if (dragged == false && !startCall && !endCall && currentGrid.getEntry(effectiveY, effectiveX) == "Wall"){
                    currentGrid.unmarkSpot(effectiveY, effectiveX);
                }  
            }
        }
    }
}
function resetCanvas(rows){
    currentGrid = new gridWrapper(rows);
    resizeCanvas(document.getElementById('canvasContainer').offsetWidth, document.getElementById('canvasContainer').offsetHeight);
    background('#171c28');
    stroke('#afafbf');
    strokeWeight(15/(2*currentGrid.numRows));
    for (let x = height/currentGrid.numRows; x <= width; x += (height / currentGrid.numRows)) {
		for (let y = height/currentGrid.numRows; y <= height; y += (height / currentGrid.numRows)) {
			line(x, 0, x, height);
			line(0, y, width, y);
        }
    }
    
}
