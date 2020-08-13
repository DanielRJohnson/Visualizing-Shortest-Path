/*
* @Author: Daniel Johnson
* @File: index.js
* @Date: 8-11-2020
* @breif: This file implements pathfinding algorithms and visualizes
*         them with help from the p5.js library
*/

/*   TODO
* A*
* Clean up code
* Mobile-friendly layout
*/

new p5();
let startTime = performance.now();
document.addEventListener('DOMContentLoaded', (event) => {
    let endTime = performance.now();
    console.log("DOM fully loaded in " + (endTime - startTime).toFixed(2) + " ms");
});
class gridWrapper{
    constructor(rows) {
        this.numRows = rows;
        this.numCols = Math.ceil(this.numRows*(width/height));;
        this.startMade = false;
        this.endMade = false;
        this.startSelected = false;
        this.endSelected = false;
        this.ran = false;

        this.grid = [];
        this.visitedGrid = [];
        for (let i = 0; i < this.numRows; i++){
            this.grid[i] = [];
            this.visitedGrid[i] = [];
        }
        for (var i = 0; i < this.numRows; i++){
            for (var j = 0; j < this.numCols; j++){
                this.grid[i][j] = ("Open");
                this.visitedGrid[i][j] = false;
            }
        }
        
    }
    markSpotAsWall(row,col){
        this.grid[row][col] = "Wall";
        fill('#1B6BDB');
        square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
    }
    markSpotAsVisited(row,col, delay){
        this.visitedGrid[row][col] = true;
        if (document.getElementById("toggle").checked == true){
            setTimeout(fill, delay, '#7CC5FF');
            setTimeout(square, delay, col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
        }
        else {
            fill('#7CC5FF');
            square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
        }
    }
    markSpotAsStart(row,col){
        this.grid[row][col] = "Start";
        fill('#00e640');
        square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
        this.startMade = true;
    }
    markSpotAsEnd(row,col){
        this.grid[row][col] = "End";
        fill('#d91e18');
        square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
        this.endMade = true;
    }
    unmarkSpot(row,col, delay){
        this.grid[row][col] = "Open";
        if (document.getElementById("toggle").checked == true){
            setTimeout(fill, delay, '#171c28');
            setTimeout(square, delay, col*(height/this.numRows), row*(height/this.numRows), height/this.numRows)
        }
        else{
            fill('#171c28');
            square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
        }
    }
    getEntry(row,col){
        return this.grid[row][col];
    }
}
class node {
    constructor(x, y, dist, prev) {
        this.x = x;
        this.y = y;
        this.dist = dist;
        if (prev){
            this.prev = prev;
        }
        else{
            this.prev = this;
        }
    }
}
/*
* I am aware that with JS arrays you can mimic a queue, but the "Shift"
* function that it uses is O(n) whereas my dequeue is O(1).
*/
class Queue{
    constructor(){
        this.elements = {};
        this.head = 0;
        this.tail= 0;
    }
    enqueue(item){
        this.elements[this.tail] = item;
        this.tail++;
    }
    dequeue(){
        var length = this.tail - this.head;
        if (length <= 0){
            return undefined;
        }
        var deletedItem = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        if (this.head == this.tail){
            this.head = 0;
            this.tail = 0;
        }
        return deletedItem;
    }
    size(){
        return this.tail - this.head;
    }
    peak(){
        return this.elements[this.tail - 1];
    }
    print(){
        var publicArr = [];
        for (var i in this.elements){
            publicArr.push(this.elements[i]);
        }
        return publicArr;
    }
}
/*
* Global variable is ugly, I know. As of right now, I haven't thought up
* a workaround because the P5 functions need access to the grid.
*/
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
        tutorial.style.display = "none";
    }
    window.onclick = function(event){
        if (event.target == tutorial){
            tutorial.style.display = "none";
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
function keyPressed(){
    /*
    if (keyCode === 83){ // S
        fillInSpace(false, true, false);
    }
    else if (keyCode === 69){ // E
        fillInSpace(false, false, true);
    }
    else if (keyCode === 32){ // space
        let startTime = performance.now();
        console.log(BFS(currentGrid));
        let endTime = performance.now();
        console.log("Calculation took " + (endTime - startTime).toFixed(2) + " ms");
    }
    else if (keyCode === 82){ // R
        resetCanvas();
    }
    else if (keyCode === UP_ARROW){
        if (rows < 100){
            rows+=5;
        resetCanvas();
        }
    }
    else if (keyCode === DOWN_ARROW){
        if (rows > 5){
            rows-=5;
        resetCanvas();
        }
    }
    */
}

//Custom Functions
function buttonPressed(button){
    if (button.id == "ReduceRows" && currentGrid.numRows > 5){
        resetCanvas(currentGrid.numRows-5);
    }
    else if (button.id == "IncreaseRows" && currentGrid.numRows < 100){
        resetCanvas(currentGrid.numRows+5);
    }
    else if (button.id == "Reset"){
        resetCanvas(currentGrid.numRows);
    }
    else if (button.id == "RunAlgorithm"){
        if (currentGrid.startMade == true && currentGrid.endMade == true && currentGrid.ran == false){
            let startTime = performance.now();
            let bfs = BFS(currentGrid);
            console.log("Distance: " + bfs);
            let endTime = performance.now();
            console.log("Calculation took " + (endTime - startTime).toFixed(2) + " ms");
            var snackbar = document.getElementById("snackbar");
            snackbar.innerHTML = "This algorithm took " + (endTime - startTime).toFixed(2) + " ms to compute a distance of " + bfs + " units";
            snackbar.className = "show";
            setTimeout(function(){snackbar.className = snackbar.className.replace("show", "")}, 5000);
        }
        else if (currentGrid.startMade == false || currentGrid.endMade == false){
            alert("Make sure to set a start and end before running the algorithm.")
        }
        
    }
    else if (button.id == "PlaceStart"){
        if (currentGrid.startMade == false){
            cursor('start.png', 10, 10);
            currentGrid.startSelected = true;
        }
        else {
            alert("Start has already been made, press 'Reset' to start a new board.");
        }
    }
    else if (button.id == "PlaceEnd"){
        if (currentGrid.endMade == false){
            cursor('end.png', 10, 10);
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
}
function fillInSpace(dragged, startCall, endCall){
    for(let x = 0; x < width; x += height/currentGrid.numRows){
        for (let y = 0; y < height - 1; y += height/currentGrid.numRows){
            if (mouseX > x && mouseX <= x + height/currentGrid.numRows
                && mouseY > y && mouseY <= y + height/currentGrid.numRows){
                    let effectiveY = floor(mouseY/(height/currentGrid.numRows));
                    let effectiveX = floor(mouseX/(height/currentGrid.numRows));

                    if (currentGrid.getEntry(effectiveY, effectiveX) == "Open"){
                        if (startCall == true && currentGrid.startMade == false){
                            currentGrid.markSpotAsStart(effectiveY, effectiveX);
                            cursor('default');
                            currentGrid.startSelected = false;
                        }
                        else if (endCall == true && currentGrid.endMade == false){
                            currentGrid.markSpotAsEnd(effectiveY, effectiveX);
                            cursor('default');
                            currentGrid.endSelected = false;
                        }
                        else if (startCall == false && endCall == false){
                            currentGrid.markSpotAsWall(effectiveY, effectiveX);
                        }
                    }
                    else if (dragged == false && startCall == false && endCall == false && currentGrid.getEntry(effectiveY, effectiveX) == "Wall"){
                        currentGrid.unmarkSpot(effectiveY, effectiveX);
                    }
                    
            }
        }
    }
}
function resetCanvas(rows){
    //resizeCanvas(windowHeight * (4/5), windowHeight * (4/5));
    currentGrid = new gridWrapper(rows);
    //console.log(document.getElementById('canvasContainer').offsetWidth, document.getElementById('canvasContainer').offsetHeight);
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
function recreatePath(p, gridW){
    let pathTimer = 0;
    while (p.prev != p){
        if (gridW.getEntry(p.x, p.y) != "End" && gridW.getEntry(p.x, p.y) != "Start"){
            if (document.getElementById("toggle").checked == true){
                setTimeout(fill, (pathTimer*1000)/currentGrid.numRows, '#e4f1fe');
                setTimeout(square, (pathTimer*1000)/currentGrid.numRows, p.y*(height/currentGrid.numRows), p.x*(height/currentGrid.numRows), height/currentGrid.numRows);
            }
            else{
                fill('#e4f1fe');
                square(p.y*(height/currentGrid.numRows), p.x*(height/currentGrid.numRows), height/currentGrid.numRows);
            }
        }
        pathTimer++;
        p = p.prev;
    }
}
function BFS(gridW){
    let source = new node(0,0,0);
    let dest = new node(0,0,0);
    let flag1 = false, flag2 = false;
    for (let i = 0; i < gridW.numRows; i++){
        for (let j = 0; j < gridW.numCols; j++){
            if (gridW.getEntry(i,j) == "Start"){
                source.x = i;
                source.y = j;
                console.log("Start found at: ( " + (j+1) + ", " + (i+1) + " )");
                flag1 = true;
            }
            if (gridW.getEntry(i,j) == "End"){
                dest.x = i;
                dest.y = j;
                console.log("End found at: ( " + (j+1) + ", " + (i+1) + " )");
                flag2 = true;
            }
        }
    }
    if (flag1 == false || flag2 == false){
        return -1;
    }

    let q = new Queue();
    q.enqueue(source);
    gridW.visitedGrid[source.x][source.y] = true;
    let visitTimer = 0;
    while (q.size() > 0){
        let p = q.dequeue();
        
        if (gridW.getEntry(p.x, p.y) == "End"){
            gridW.grid[source.x][source.y] = "Start";
            let dist = p.dist;
            currentGrid.ran = true;
            if (document.getElementById("toggle").checked == true){
                setTimeout(recreatePath, (visitTimer*100)/currentGrid.numRows, p, gridW);
            }
            else {
                recreatePath(p, gridW);
            }
            return dist;
        }

        if (p.x - 1 >= 0 && (gridW.getEntry(p.x - 1, p.y) != "Wall") && (!gridW.visitedGrid[p.x - 1][p.y])){
            if (gridW.getEntry(p.x - 1, p.y) == "Open" || gridW.getEntry(p.x - 1, p.y) == "End"){
                let n = new node(p.x - 1, p.y, p.dist + 1);
                n.prev = p;
                q.enqueue(n);
                if (gridW.getEntry(p.x - 1, p.y) != "End"){
                    gridW.markSpotAsVisited(p.x - 1, p.y, (visitTimer*100)/currentGrid.numRows);
                }
            }
        }
        if (p.x + 1 < gridW.numRows && (gridW.getEntry(p.x + 1, p.y) != "Wall") && (!gridW.visitedGrid[p.x + 1][p.y])){
            if (gridW.getEntry(p.x + 1, p.y) == "Open" || gridW.getEntry(p.x + 1, p.y) == "End"){
                let n = new node(p.x + 1, p.y, p.dist + 1);
                n.prev = p;
                q.enqueue(n);
                if (gridW.getEntry(p.x + 1, p.y) != "End"){
                    gridW.markSpotAsVisited(p.x + 1, p.y, (visitTimer*100)/currentGrid.numRows);
                }
            }
        }
        if (p.y - 1 >= 0 && (gridW.getEntry(p.x, p.y - 1) != "Wall") && (!gridW.visitedGrid[p.x][p.y - 1])){
            if (gridW.getEntry(p.x, p.y - 1) == "Open" || gridW.getEntry(p.x, p.y - 1) == "End"){
                let n = new node(p.x, p.y - 1, p.dist+1);
                n.prev = p;
                q.enqueue(n);
                if (gridW.getEntry(p.x, p.y - 1) != "End"){
                    gridW.markSpotAsVisited(p.x, p.y - 1, (visitTimer*100)/currentGrid.numRows);
                }
            }
        }
        if (p.y + 1 < gridW.numCols && (gridW.getEntry(p.x, p.y + 1) != "Wall") && (!gridW.visitedGrid[p.x][p.y + 1])){
            if (gridW.getEntry(p.x, p.y + 1) == "Open" || gridW.getEntry(p.x, p.y + 1) == "End"){
                let n = new node(p.x, p.y + 1, p.dist + 1);
                n.prev = p;
                q.enqueue(n);
                if (gridW.getEntry(p.x, p.y + 1) != "End"){
                    gridW.markSpotAsVisited(p.x, p.y + 1, (visitTimer*100)/currentGrid.numRows);
                }
            }
        }
        visitTimer++;
    }
    gridW.grid[source.x][source.y] = "Start";
    return -1;
}
function generateMazePrim(gridW){
    for (let i = 0; i < gridW.numRows; i++){
        for (let j = 0; j < gridW.numCols; j++){
            gridW.markSpotAsWall(i,j);
        }
    }
    let animationTimer = 0;
    let start = new node(ceil(gridW.numRows/2), floor(gridW.numCols/2));
    gridW.unmarkSpot(start.x, start.y);

    let frontierCells = [];
    if (start.x - 2 >= 1 && gridW.getEntry(start.x - 2, start.y) == "Wall") {frontierCells.push(new node(start.x - 2, start.y, 2, start));}
    if (start.x + 2 < gridW.numRows - 1 && gridW.getEntry(start.x + 2, start.y) == "Wall") {frontierCells.push(new node(start.x + 2, start.y, 2, start));}
    if (start.y - 2 >= 1 && gridW.getEntry(start.x, start.y - 2) == "Wall") {frontierCells.push(new node(start.x, start.y - 2, 2, start));}
    if (start.y + 2 < gridW.numCols - 1 && gridW.getEntry(start.x, start.y + 2) == "Wall") {frontierCells.push(new node(start.x, start.y + 2, 2, start));}
    
    while (frontierCells.length > 0){
        animationTimer++;
        let randomCellIndex = floor(Math.random() * (frontierCells.length-1));
        let randomCell = frontierCells[randomCellIndex];
        gridW.unmarkSpot(randomCell.x, randomCell.y, (animationTimer*200)/currentGrid.numRows);

        let neighbors = [];
        if (randomCell.x - 2 >= 1 && gridW.getEntry(randomCell.x - 2, randomCell.y) == "Open") {neighbors.push(new node(randomCell.x - 2, randomCell.y, 2, randomCell));}
        if (randomCell.x + 2 < gridW.numRows - 1 && gridW.getEntry(randomCell.x + 2, randomCell.y) == "Open") {neighbors.push(new node(randomCell.x + 2, randomCell.y, 2, randomCell));}
        if (randomCell.y - 2 >= 1 && gridW.getEntry(randomCell.x, randomCell.y - 2) == "Open") {neighbors.push(new node(randomCell.x, randomCell.y - 2, 2, randomCell));}
        if (randomCell.y + 2 < gridW.numCols - 1 && gridW.getEntry(randomCell.x, randomCell.y + 2) == "Open") {neighbors.push(new node(randomCell.x, randomCell.y + 2, 2, randomCell));}

        let randomNeighborIndex = floor(Math.random() * (neighbors.length-1));
        let randomNeighbor = neighbors[randomNeighborIndex];
        let middleXOffset = (randomNeighbor.x - randomCell.x)/2;
        let middleYOffset = (randomNeighbor.y - randomCell.y)/2;
        if (gridW.visitedGrid[randomCell.x][randomCell.y] == false){gridW.unmarkSpot(randomCell.x + middleXOffset, randomCell.y + middleYOffset, (animationTimer*200)/currentGrid.numRows);}

        if (randomCell.x - 2 >= 1 && gridW.getEntry(randomCell.x - 2, randomCell.y) == "Wall") {frontierCells.push(new node(randomCell.x - 2, randomCell.y, 2, randomCell));}
        if (randomCell.x + 2 < gridW.numRows - 1 && gridW.getEntry(randomCell.x + 2, randomCell.y) == "Wall") {frontierCells.push(new node(randomCell.x + 2, randomCell.y, 2, randomCell));}
        if (randomCell.y - 2 >= 1 && gridW.getEntry(randomCell.x, randomCell.y - 2) == "Wall") {frontierCells.push(new node(randomCell.x, randomCell.y - 2, 2, randomCell));}
        if (randomCell.y + 2 < gridW.numCols - 1 && gridW.getEntry(randomCell.x, randomCell.y + 2) == "Wall") {frontierCells.push(new node(randomCell.x, randomCell.y + 2, 2, randomCell));}
        gridW.visitedGrid[randomCell.x][randomCell.y] = true;
        frontierCells.splice(randomCellIndex, 1);
    }
    for (let i = 0; i < gridW.numRows; i++){
        for (let j = 0; j < gridW.numCols; j++){
            gridW.visitedGrid[i][j] = false;
        }
    }
}