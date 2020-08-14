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
            let info;
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
    else if (button.id == "A*"){
        document.getElementById("RunAlgorithm").innerHTML = "Run Algorithm: A*";
        resetCanvas(currentGrid.numRows);
    }
    else if (button.id == "BFS"){
        document.getElementById("RunAlgorithm").innerHTML = "Run Algorithm: Breadth-First Search";
        resetCanvas(currentGrid.numRows);
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