//MORE IMPORTANT
//Add A*
//maze generator
//make look good on mobile
//place start and end bug when clicking off of canvas

//LESS IMPORTANT
//add effect when path reaches start
//eventually clean up code

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
        this.grid = [];
        this.startMade = false;
        this.endMade = false;
        this.startSelected = false;
        this.endSelected = false;
        this.ran = false;
        for (let i = 0; i < this.numRows; i++){
            this.grid[i] = [];
        }
        //console.log(this.grid);
        
        for (var i = 0; i < this.numRows; i++){
            for (var j = 0; j < this.numCols; j++){
                this.grid[i][j] = ("Open");
            }
        }
        
    }
    markSpotAsWall(row,col){
        this.grid[row][col] = "Wall";
        fill('#1B6BDB');
        square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
    }
    markSpotAsVisited(row,col, delay){
        this.grid[row][col] = "Visited";
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
    unmarkSpot(row,col){
        this.grid[row][col] = "Open";
        fill('#171c28');
        square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
    }
    getEntry(row,col){
        return this.grid[row][col];
    }
}
class node {
    constructor(x, y, dist) {
        this.x = x;
        this.y = y;
        this.dist = dist;
        this.prev = this;
    }
}
//credit to https://medium.com/@mayashavin/ds-queue-implementation-in-js-21ea5914c428
function Queue(){
	var storage = {},
		head = 0,
		tail= 0;
    
	return {
		enQueue: function(item){
		storage[tail] = item;
		tail++;
		},
		deQueue: function(){
			var size = tail - head;

			if (size <= 0) return undefined;

			var item = storage[head];
			
			delete storage[head];

			head++;

			//Reset the counter
			if (head === tail){
				head = 0;
				tail = 0;
			}
			
			return item;
		},
		size: function(){
			return tail - head;
		},
		peek: function(){
			return storage[tail - 1];
		},
		print: function(){
			var result = [];

			for (var key in storage){
				result.push(storage[key]);
			}

			return result;
		}
	}
}
var currentGrid = new gridWrapper(25);
//P5 Setup
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
//P5 Functions
function draw() {
}
function windowResized() {
    resetCanvas(currentGrid.numRows);
}
function mousePressed(){
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        if (currentGrid.startSelected == true){
            fillInSpace(false, true, false);
            currentGrid.startSelected = false;
        }
        else if (currentGrid.endSelected == true){
            fillInSpace(false, false, true);
            currentGrid.endSelected = false;
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
function fillInSpace(dragged, startCall, endCall){
    for(let x = 0; x < width; x += height/currentGrid.numRows){
        for (let y = 0; y < height - 1; y += height/currentGrid.numRows){
            if (mouseX > x && mouseX <= x + height/currentGrid.numRows
                && mouseY > y && mouseY <= y + height/currentGrid.numRows){
                    let effectiveY = floor(mouseY/(height/currentGrid.numRows));
                    let effectiveX = floor(mouseX/(height/currentGrid.numRows));
                    //console.log(effectiveY);
                    //console.log(effectiveX);
                    if (currentGrid.getEntry(effectiveY, effectiveX) == "Open"){
                        if (startCall == true && currentGrid.startMade == false){
                            currentGrid.markSpotAsStart(effectiveY, effectiveX);
                            cursor('default');
                        }
                        else if (endCall == true && currentGrid.endMade == false){
                            currentGrid.markSpotAsEnd(effectiveY, effectiveX);
                            cursor('default');
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
    //console.log(currentGrid);
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
    q.enQueue(source);
    gridW.grid[source.x][source.y] = "Visited";
    let visitTimer = 0;
    while (q.size() > 0){
        let p = q.deQueue();
        
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

        if (p.x - 1 >= 0 && (gridW.getEntry(p.x - 1, p.y) != "Wall")){
            if (gridW.getEntry(p.x - 1, p.y) == "Open" || gridW.getEntry(p.x - 1, p.y) == "End"){
                let n = new node(p.x - 1, p.y, p.dist + 1);
                n.prev = p;
                q.enQueue(n);
                if (gridW.getEntry(p.x - 1, p.y) != "End"){
                    gridW.markSpotAsVisited(p.x - 1, p.y, (visitTimer*100)/currentGrid.numRows);
                }
            }
        }
        if (p.x + 1 < gridW.numRows && (gridW.getEntry(p.x + 1, p.y) != "Wall")){
            if (gridW.getEntry(p.x + 1, p.y) == "Open" || gridW.getEntry(p.x + 1, p.y) == "End"){
                let n = new node(p.x + 1, p.y, p.dist + 1);
                n.prev = p;
                q.enQueue(n);
                if (gridW.getEntry(p.x + 1, p.y) != "End"){
                    gridW.markSpotAsVisited(p.x + 1, p.y, (visitTimer*100)/currentGrid.numRows);
                }
            }
        }
        if (p.y - 1 >= 0 && (gridW.getEntry(p.x, p.y - 1) != "Wall")){
            if (gridW.getEntry(p.x, p.y - 1) == "Open" || gridW.getEntry(p.x, p.y - 1) == "End"){
                let n = new node(p.x, p.y - 1, p.dist+1);
                n.prev = p;
                q.enQueue(n);
                if (gridW.getEntry(p.x, p.y - 1) != "End"){
                    gridW.markSpotAsVisited(p.x, p.y - 1, (visitTimer*100)/currentGrid.numRows);
                }
            }
        }
        if (p.y + 1 < gridW.numCols && (gridW.getEntry(p.x, p.y + 1) != "Wall")){
            if (gridW.getEntry(p.x, p.y + 1) == "Open" || gridW.getEntry(p.x, p.y + 1) == "End"){
                let n = new node(p.x, p.y + 1, p.dist + 1);
                n.prev = p;
                q.enQueue(n);
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
function buttonPressed(button){
    if (button.id == "ReduceRows" && currentGrid.numRows > 5){
        resetCanvas(currentGrid.numRows-5);
    }
    else if (button.id == "IncreaseRows" && currentGrid.numRows < 75){
        resetCanvas(currentGrid.numRows+5);
    }
    else if (button.id == "Reset"){
        resetCanvas(currentGrid.numRows);
    }
    else if (button.id == "RunAlgorithm"){
        if (currentGrid.startMade == true && currentGrid.endMade == true && currentGrid.ran == false){
            let startTime = performance.now();
            let bfs = BFS(currentGrid);
            console.log(bfs);
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
}
