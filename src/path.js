function drawPath(path, gridW){
    let pathTimer = 0;
    stroke('black');
    strokeWeight(3);
    var delay;
    let squareSize = (height/gridW.numRows);
    let offset = (height/gridW.numRows)/2;
    for (let i in path){
        delay = (pathTimer * 1000)/gridW.numRows;
        if (gridW.getEntry(path[i].x, path[i].y) != "Start" && gridW.getEntry(path[i].x, path[i].y) != "End"){
            if (document.getElementById("toggle").checked == true){
                if (i > 0){
                    setTimeout(line, delay, path[i].y*squareSize + offset, path[i].x*squareSize + offset, path[i-1].y*squareSize + offset, path[i-1].x*squareSize + offset);
                }
                else{
                    setTimeout(line, delay, gridW.startY*squareSize + offset, gridW.startX*squareSize + offset, path[0].y*squareSize + offset, path[0].x*squareSize + offset);
                }
            }
            else{
                if (i > 0){
                    line(path[i].y*squareSize + offset, path[i].x*squareSize + offset, path[i-1].y*squareSize + offset, path[i-1].x*squareSize + offset);
                }
                else{
                    line(gridW.startY*squareSize + offset, gridW.startX*squareSize + offset, path[0].y*squareSize + offset, path[0].x*squareSize + offset);
                }
            }
        }
        pathTimer++;
    }
    if (document.getElementById("toggle").checked == true){
        setTimeout(line, delay, path[path.length - 2].y*squareSize + offset, path[path.length - 2].x*squareSize + offset, gridW.endY*squareSize + offset, gridW.endX*squareSize + offset);
    }
    else{
        line(path[path.length - 2].y*squareSize + offset, path[path.length - 2].x*squareSize + offset, gridW.endY*squareSize + offset, gridW.endX*squareSize + offset);
    }
    //noStroke();
}
function recreatePath(p, gridW, visitTimer){
    let path = [];
    while (p.prev != p){
        path.unshift(p);
        p = p.prev;
    }
    if (document.getElementById("toggle").checked == false){
        drawPath(path, gridW);
    }
    else if (document.getElementById("ChangeAlgorithm").innerHTML == "Change Algorithm: A*"){
        setTimeout(drawPath, (visitTimer*500)/gridW.numRows, path, gridW);
    }
    else {
        setTimeout(drawPath, (visitTimer*100)/gridW.numRows, path, gridW);
    }
    
}