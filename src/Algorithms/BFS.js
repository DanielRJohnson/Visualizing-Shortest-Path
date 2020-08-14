function BFS(gridW){
    let startTime = performance.now();
    let source = new node(gridW.startX, gridW.startY, 0);
    let q = new prioQueue();
    q.enqueue(source, source.dist);
    let visitTimer = 0;
    while (!q.isEmpty()){
        let p = q.dequeue().element;
        if (gridW.getEntry(p.x, p.y) == "End"){
            let endTime = performance.now();
            recreatePath(p, gridW, visitTimer);
            return {dist: p.dist, time: endTime-startTime};
        }
        let neighbors = p.getNeighbors(gridW);
        for (let i in neighbors){
            let neighbor = neighbors[i];
            if (gridW.getEntry(neighbor.x, neighbor.y) != "Wall" && !gridW.visitedGrid[neighbor.x][neighbor.y]){
                q.enqueue(neighbor, neighbor.dist);
                gridW.markSpotAsVisited(neighbor.x, neighbor.y, (visitTimer*100)/gridW.numRows);
            }
        }
        visitTimer++;
    }
    let endTime = performance.now();
    return {dist: -1, time: endTime-startTime};
}