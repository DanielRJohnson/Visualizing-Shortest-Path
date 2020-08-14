/*
* @Author: Daniel Johnson
* @File: RandomPrim's.js
* @Date: 8-11-2020
* @breif: This file uses random Prim's algorithm to generate and draw a maze
*         !!!This code is not very polished or efficient, fair warning!!!
*/
function generateMazePrim(gridW){
    currentGrid.animating = true;
    for (let i = 0; i < gridW.numRows; i++){
        for (let j = 0; j < gridW.numCols; j++){
            gridW.markSpotAsWall(i,j);
        }
    }
    let start = new node(ceil(gridW.numRows/2), floor(gridW.numCols/2));
    gridW.unmarkSpot(start.x, start.y);

    let frontierCells = [];
    if (start.x - 2 >= 1 && gridW.getEntry(start.x - 2, start.y) == "Wall") {frontierCells.push(new node(start.x - 2, start.y, 2, start));}
    if (start.x + 2 < gridW.numRows - 1 && gridW.getEntry(start.x + 2, start.y) == "Wall") {frontierCells.push(new node(start.x + 2, start.y, 2, start));}
    if (start.y - 2 >= 1 && gridW.getEntry(start.x, start.y - 2) == "Wall") {frontierCells.push(new node(start.x, start.y - 2, 2, start));}
    if (start.y + 2 < gridW.numCols - 1 && gridW.getEntry(start.x, start.y + 2) == "Wall") {frontierCells.push(new node(start.x, start.y + 2, 2, start));}
    let visitTimer = 0;
    while (frontierCells.length > 0){
        visitTimer++;
        let randomCellIndex = floor(Math.random() * (frontierCells.length-1));
        let randomCell = frontierCells[randomCellIndex];
        gridW.unmarkSpot(randomCell.x, randomCell.y, visitTimer);

        let neighbors = [];
        if (randomCell.x - 2 >= 1 && gridW.getEntry(randomCell.x - 2, randomCell.y) == "Open") {neighbors.push(new node(randomCell.x - 2, randomCell.y, 2, randomCell));}
        if (randomCell.x + 2 < gridW.numRows - 1 && gridW.getEntry(randomCell.x + 2, randomCell.y) == "Open") {neighbors.push(new node(randomCell.x + 2, randomCell.y, 2, randomCell));}
        if (randomCell.y - 2 >= 1 && gridW.getEntry(randomCell.x, randomCell.y - 2) == "Open") {neighbors.push(new node(randomCell.x, randomCell.y - 2, 2, randomCell));}
        if (randomCell.y + 2 < gridW.numCols - 1 && gridW.getEntry(randomCell.x, randomCell.y + 2) == "Open") {neighbors.push(new node(randomCell.x, randomCell.y + 2, 2, randomCell));}

        let randomNeighborIndex = floor(Math.random() * (neighbors.length-1));
        let randomNeighbor = neighbors[randomNeighborIndex];
        let middleXOffset = (randomNeighbor.x - randomCell.x)/2;
        let middleYOffset = (randomNeighbor.y - randomCell.y)/2;
        if (gridW.visitedGrid[randomCell.x][randomCell.y] == false){
            gridW.unmarkSpot(randomCell.x + middleXOffset, randomCell.y + middleYOffset, visitTimer);
        }

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
    setTimeout(function(){gridW.animating = false;}, visitTimer)
}