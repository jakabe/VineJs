var tree;
var nameIndex = 0;
function setup(){
    ellipseMode(CENTER);
    createCanvas(500,500);
    tree = new treeObj();
}

function draw() {
    background(0,0,0);
    tree.display();
    var r = random(-1,1);
    if(r<0){
        if(tree.limbs.length<50){
            tree.grow();
        }
        
    }
}


class treeNode {
    constructor(parent,ni){
        this.name = "node-"+nameIndex;
        nameIndex ++;
        this.parent = parent;
        if(parent != null){
            console.log(`Constructed "${this.name}" with parent "${this.parent.name}"`);
            //console.log(parent);
            this.pos = createVector(this.parent.pos.x+random(-10,10),this.parent.pos.y-random(0,10));
        } else {
            console.log(`Root, name is ${this.name}`);
            this.pos = createVector(random(0,width),random(height-10,height));
        }
       
        

        

        this.radius = 10;
        
        

        this.c = color( random(64,255) ,random(64,255) ,0 );
        
        this.dir = createVector(random(-1,1),random(-1,1));

        this.movable = true;
        
        this.child = null;
    }

    display(){
        
        if(this.parent != null){
            stroke(150,75,0);
            strokeWeight(2);
            fill(150,75,0);
            line(this.parent.pos.x, this.parent.pos.y,this.pos.x,this.pos.y);
        }
        noStroke();
        fill(this.c);
        ellipse(this.pos.x,this.pos.y,this.radius,this.radius);
    }

    move(){
        if(this.movable == true){
            this.pos.x += this.dir.x;
            this.pos.y += this.dir.y;
        }
        
    }
    
    branch(ni){
        var t = new treeNode(this,ni);
        
        this.child = t;
        console.log(`   treeNode ${this.name} branched! new branch is ${this.child.name}`);
        return t;

        
    }
    
}

class treeObj {
    constructor(){
        console.log("constructed tree");
        this.limbs = []
        this.trunk = new treeNode(null);
        this.trunk.movable = false;
        this.limbs.push(this.trunk);
        this.nameIndex = 0;
    }

    display(){
       for(var i = 0 ; i < this.limbs.length ; i++){
        this.limbs[i].display();
       }
    }

    grow(){
        var tt = this.limbs[this.limbs.length-1].branch(nameIndex);
        this.limbs.push(tt);
        nameIndex++;
    }
}