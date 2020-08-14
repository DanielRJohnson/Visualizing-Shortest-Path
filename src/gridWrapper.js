class gridWrapper{
    constructor(rows) {
        this.numRows = rows;
        this.numCols = Math.ceil(this.numRows*(width/height));
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
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
        fill('#4834d4');
        square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
    }
    markSpotAsVisited(row,col, delay){
        this.visitedGrid[row][col] = true;
        if (this.grid[row][col] == "Open"){
            if (document.getElementById("toggle").checked == true){
                    setTimeout(fill, delay, '#ff0084');
                    setTimeout(square, delay, col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
            }
            else {
                fill('#ff0084');
                square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
            }
        }
        
    }
    markSpotAsStart(row,col){
        this.grid[row][col] = "Start";
        this.startX = row;
        this.startY = col;
        fill('#00FF00');
        square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
        this.startSelected = false;
        this.startMade = true;
    }
    markSpotAsEnd(row,col){
        this.grid[row][col] = "End";
        this.endX = row;
        this.endY = col;
        fill('#FF0000');
        square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
        this.endSelected = false;
        this.endMade = true;
    }
    unmarkSpot(row,col, delay){
        this.grid[row][col] = "Open";
        if (document.getElementById("toggle").checked == true){
            //In this case, setTimeout seems to have enough complexity to delay the animation naturally
            setTimeout(fill, 0, '#ecf0f1');
            setTimeout(square, 0, col*(height/this.numRows), row*(height/this.numRows), height/this.numRows)
        }
        else{
            fill('white');
            square(col*(height/this.numRows), row*(height/this.numRows), height/this.numRows);
        }
    }
    getEntry(row,col){
        return this.grid[row][col];
    }
}