function heuristic(a, b){
    return abs(a.x - b.x) + abs(a.y - b.y); //Manhattan
    //return dist(a.x, a.y, b.x, b.y); //Uclidean if ever needed
}
function AStar(gridW){
    let start = new node(gridW.startX, gridW.startY);
    let end = new node(gridW.endX, gridW.endY);
    start.g = 0;
    start.h = heuristic(start, end);
    start.f = start.h;

    let openSet = new prioQueue();
    openSet.enqueue(start, start.f) //O(N)-ish
    let visitTimer = 0;
    while(!openSet.isEmpty()){
        visitTimer++;
        let current = openSet.peekFront().element;

        if (gridW.getEntry(current.x, current.y) == "End"){ //Are we done?
            recreatePath(current, gridW, visitTimer);
            return current.g;
        }
        openSet.dequeue();

        let neighbors = current.getNeighbors(gridW);
        for (let i in neighbors){
            let neighbor = neighbors[i];
            let tentativeG = current.g + 1;
            if (gridW.getEntry(neighbor.x, neighbor.y) != "Wall" && !gridW.visitedGrid[neighbor.x][neighbor.y]){
                if (tentativeG < neighbor.g){
                    neighbor.g = tentativeG;
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    if (!openSet.includes(neighbor)){
                        openSet.enqueue(neighbor, neighbor.f);
                        gridW.markSpotAsVisited(neighbor.x, neighbor.y, (visitTimer*500)/gridW.numRows);
                    }
                }
            }
        }
    }
    return -1; //No solution
}