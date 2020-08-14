/*
* @Author: Daniel Johnson
* @File: prioQueue.js
* @Date: 8-11-2020
* @breif: This file implements a priority queue to be used by A* and BFS
*/
class QElement{
    constructor(element, priority){
        this.element = element;
        this.priority = priority;
    }
}
class prioQueue{
    constructor(){
        this.elements = [];
    }
    enqueue(item, priority){
        var qElement = new QElement(item, priority);
        var contain = false;
        for (let i in this.elements){
            if (this.elements[i].priority > qElement.priority){
                this.elements.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
        if (!contain){
            this.elements.push(qElement);
        }
    }
    dequeue(){
        if (this.isEmpty()){
            return undefined;
        }
        return this.elements.shift();
    }
    isEmpty(){
        return this.elements.length == 0;
    }
    size(){
        return this.elements.length;
    }
    peekFront(){
        if (this.isEmpty()){
            return undefined;
        }
        return this.elements[0];
    }
    peekBack(){
        if (this.isEmpty()){
            return undefined;
        }
        return this.elements[this.elements.length - 1];
    }
    includes(element){
        return this.elements.includes(element);
    }
    print(){
        var publicArr = [];
        for (var i in this.elements){
            publicArr.push(this.elements[i]);
        }
        return publicArr;
    }
}