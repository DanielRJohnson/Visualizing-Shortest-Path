/*
* @Author: Daniel Johnson
* @File: RandomPrim's.js
* @Date: 8-11-2020
* @breif: This file uses random Prim's algorithm to generate and draw a maze
*/
function addNeighborsOfType(gridW, arr, cell, type){
    if (cell.x - 2 >= 1 && gridW.getEntry(cell.x - 2, cell.y) == type) {arr.push(new node(cell.x - 2, cell.y, 2, cell));}
    if (cell.x + 2 < gridW.numRows - 1 && gridW.getEntry(cell.x + 2, cell.y) == type) {arr.push(new node(cell.x + 2, cell.y, 2, cell));}
    if (cell.y - 2 >= 1 && gridW.getEntry(cell.x, cell.y - 2) == type) {arr.push(new node(cell.x, cell.y - 2, 2, cell));}
    if (cell.y + 2 < gridW.numCols - 1 && gridW.getEntry(cell.x, cell.y + 2) == type) {arr.push(new node(cell.x, cell.y + 2, 2, cell));}
}
function generateMazePrim(gridW){
    currentGrid.animating = true;
    for (let i = 0; i < gridW.numRows; i++){
        for (let j = 0; j < gridW.numCols; j++){
            gridW.markSpotAsWall(i,j);
        }
    }
    let start = new node(ceil(gridW.numRows/2), floor(gridW.numCols/2), 0);
    gridW.unmarkSpot(start.x, start.y);
    let frontierCells = [];
    addNeighborsOfType(gridW, frontierCells, start, "Wall");

    let visitTimer = 0;
    while (frontierCells.length > 0){
        visitTimer++;
        let randomCellIndex = floor(Math.random() * (frontierCells.length-1));
        let randomCell = frontierCells[randomCellIndex];
        gridW.unmarkSpot(randomCell.x, randomCell.y, visitTimer);

        let neighbors = [];
        addNeighborsOfType(gridW, neighbors, randomCell, "Open");
        let randomNeighborIndex = floor(Math.random() * (neighbors.length-1));
        let randomNeighbor = neighbors[randomNeighborIndex];
        let middleXOffset = (randomNeighbor.x - randomCell.x)/2;
        let middleYOffset = (randomNeighbor.y - randomCell.y)/2;
        if (gridW.visitedGrid[randomCell.x][randomCell.y] == false){
            gridW.unmarkSpot(randomCell.x + middleXOffset, randomCell.y + middleYOffset, visitTimer);
        }
        addNeighborsOfType(gridW, frontierCells, randomCell, "Wall");
        gridW.visitedGrid[randomCell.x][randomCell.y] = true;
        frontierCells.splice(randomCellIndex, 1);
    }
    for (let i = 0; i < gridW.numRows; i++){
        for (let j = 0; j < gridW.numCols; j++){
            gridW.visitedGrid[i][j] = false;
        }
    }
    setTimeout(function(){gridW.animating = false;}, visitTimer);
}