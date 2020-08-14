class node {
    constructor(x, y, dist, prev, g) {
        this.x = x;
        this.y = y;
        this.dist = dist;
        if (prev){
            this.prev = prev;
        }
        else{
            this.prev = this;
        }
        this.f = Infinity;
        this.g = Infinity;
        this.h = Infinity;
        
    }
    getNeighbors(gridW){
        let neighbors = [];
        if (this.x - 1 >= 0){neighbors.push(new node(this.x - 1, this.y, this.dist + 1, this));}
        if (this.x + 1 < gridW.numRows){neighbors.push(new node(this.x + 1, this.y, this.dist + 1, this));}
        if (this.y - 1 >= 0){neighbors.push(new node(this.x, this.y - 1, this.dist + 1, this));}
        if (this.y + 1 < gridW.numCols){neighbors.push(new node(this.x, this.y + 1, this.dist + 1, this));}
        if (document.getElementById("toggleDiag").checked){
            if (this.x - 1 >= 0 && this.y + 1 < gridW.numCols 
                && !(gridW.getEntry(this.x - 1, this.y) == "Wall" || gridW.getEntry(this.x, this.y + 1) == "Wall")){
                neighbors.push(new node(this.x - 1, this.y + 1, this.dist + 1, this));
            }
            if (this.x + 1 < gridW.numRows && this.y + 1 < gridW.numCols
                && !(gridW.getEntry(this.x + 1, this.y) == "Wall" || gridW.getEntry(this.x, this.y + 1) == "Wall")){
                    neighbors.push(new node(this.x + 1, this.y + 1, this.dist + 1, this));
            }
            if (this.x + 1 < gridW.numRows && this.y - 1 >= 0
                && !(gridW.getEntry(this.x + 1, this.y) == "Wall" || gridW.getEntry(this.x, this.y - 1) == "Wall")){
                    neighbors.push(new node(this.x + 1, this.y - 1, this.dist + 1, this));
            }
            if (this.x - 1 >= 0 && this.y - 1 >= 0
                && !(gridW.getEntry(this.x - 1, this.y) == "Wall" || gridW.getEntry(this.x, this.y - 1) == "Wall")){
                    neighbors.push(new node(this.x - 1, this.y - 1, this.dist + 1, this));
                }
        }
        return neighbors;
    }
}