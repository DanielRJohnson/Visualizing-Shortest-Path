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
    if (document.getElementById("toggle").checked == true && path.length > 1){
        setTimeout(line, delay, path[path.length - 2].y*squareSize + offset, path[path.length - 2].x*squareSize + offset, gridW.endY*squareSize + offset, gridW.endX*squareSize + offset);
        setTimeout(strokeWeight, delay, 0.25);
        //setTimeout(noStroke, delay);
        setTimeout(function(){gridW.animating = false;}, delay)
    }
    else if (path.length > 1){
        line(path[path.length - 2].y*squareSize + offset, path[path.length - 2].x*squareSize + offset, gridW.endY*squareSize + offset, gridW.endX*squareSize + offset);
        strokeWeight(0.25);
        //noStroke();
        gridW.animating = false;
    }
    else{
        gridW.animating = false;
    }
}
function recreatePath(p, gridW, visitTimer){
    gridW.animating = true;
    let path = [];
    while (p.prev != p){
        path.unshift(p);
        p = p.prev;
    }
    if (document.getElementById("toggle").checked == false){
        drawPath(path, gridW);
    }
    setTimeout(drawPath, (visitTimer*100)/gridW.numRows, path, gridW);
}