/*
* @Author: Daniel Johnson
* @File: index.js
* @Date: 8-11-2020
* @breif: This file handles all button inputs
*/
function buttonPressed(button){
    if (button.id == "ReduceRows" && currentGrid.numRows > 5){
        if (!currentGrid.animating){
            resetCanvas(currentGrid.numRows-5);
        }
    }
    else if (button.id == "IncreaseRows" && currentGrid.numRows < 90){
        if (!currentGrid.animating){
            resetCanvas(currentGrid.numRows+5);
        }
    }
    else if (button.id == "Reset"){
        if (!currentGrid.animating){
            resetCanvas(currentGrid.numRows);
        }
    }
    else if (button.id == "RunAlgorithm"){
        if (currentGrid.startMade == true && currentGrid.endMade == true){
            let info;
            if (currentGrid.ran == true){
                for (let i = 0; i < currentGrid.numRows; i++){
                    for (let j = 0; j < currentGrid.numCols; j++){
                        if (currentGrid.getEntry(i,j) == "Start"){
                            currentGrid.visitedGrid[i][j] = false;
                            fill('#00FF00');
                            square(j*(height/currentGrid.numRows), i*(height/currentGrid.numRows), (height/currentGrid.numRows));
                        }
                        else if (currentGrid.getEntry(i,j) == "End"){
                            currentGrid.visitedGrid[i][j] = false;
                            fill('#FF0000');
                            square(j*(height/currentGrid.numRows), i*(height/currentGrid.numRows), (height/currentGrid.numRows));
                        }
                        else if (currentGrid.getEntry(i,j) == "Open"){
                            currentGrid.visitedGrid[i][j] = false;
                            fill('#ecf0f1');
                            square(j*(height/currentGrid.numRows), i*(height/currentGrid.numRows), (height/currentGrid.numRows));
                        }
                    }
                }
                drawGrid();
            }
            if (button.innerHTML == "Run Algorithm: Breadth-First Search"){
                info = BFS(currentGrid);
            }
            else {
                info = AStar(currentGrid);
            }
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
        cursor('images/start.png', 10, 10);
        currentGrid.startSelected = true;

    }
    else if (button.id == "PlaceEnd"){
        cursor('images/end.png', 10, 10);
        currentGrid.endSelected = true;
    }
    else if (button.id == "GenerateMaze"){
        if (!currentGrid.animating){
            resetCanvas(currentGrid.numRows);
            generateMazePrim(currentGrid);
        }
    }
    else if (button.id == "A*"){
        document.getElementById("RunAlgorithm").innerHTML = "Run Algorithm: A*";
        //this is to avoid clicks on the dropdown affecting the canvas
        let effectiveX = floor(mouseX/(height/currentGrid.numRows));
        let effectiveY = floor(mouseY/(height/currentGrid.numRows))
        if (currentGrid.getEntry(effectiveY, effectiveX) == "Wall"){
            currentGrid.unmarkSpot(effectiveY, effectiveX);
        }
        else{
            currentGrid.markSpotAsWall(effectiveY, effectiveX);
        }
    }
    else if (button.id == "BFS"){
        document.getElementById("RunAlgorithm").innerHTML = "Run Algorithm: Breadth-First Search";
        //this is to avoid clicks on the dropdown affecting the canvas
        let effectiveX = floor(mouseX/(height/currentGrid.numRows));
        let effectiveY = floor(mouseY/(height/currentGrid.numRows))
        if (currentGrid.getEntry(effectiveY, effectiveX) == "Wall"){
            currentGrid.unmarkSpot(effectiveY, effectiveX);
        }
        else{
            currentGrid.markSpotAsWall(effectiveY, effectiveX);
        }
    }
    else if (button.id == "Next"){
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("tutorial2").style.display = "inline";
    }
    else if (button.id == "Next2"){
        document.getElementById("tutorial2").style.display = "none";
        document.getElementById("tutorial3").style.display = "inline";
    }
    else if (button.id == "Next3"){
        document.getElementById("tutorial3").style.display = "none";
        document.getElementById("tutorial4").style.display = "inline";
    }
    else if (button.id == "Next4"){
        document.getElementById("tutorial4").style.display = "none";
        document.getElementById("tutorial5").style.display = "inline";
    }
    else if (button.id == "Next5"){
        document.getElementById("tutorial5").style.display = "none";
    }
}