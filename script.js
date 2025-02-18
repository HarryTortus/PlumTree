let shapes = [];
let sliderA, sliderB, sliderC;
let sliderContainer;
let versionNumber = "0.02"; // Change this for version updates

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    background(0);
    
    // Remove default margins and padding to prevent scrollbars
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    
    // Create sliders at the bottom of the screen with a gray border and larger size
    sliderContainer = createDiv('').style('position', 'absolute')
                                     .style('bottom', '10px')
                                     .style('left', '50%')
                                     .style('transform', 'translateX(-50%)')
                                     .style('padding', '20px')
                                     .style('background', '#888')
                                     .style('border-radius', '10px');
    
    sliderA = createSlider(1, 10, 5, 0.1).style('width', '150px').style('height', '20px').parent(sliderContainer);
    sliderB = createSlider(1, 10, 5, 0.1).style('width', '150px').style('height', '20px').parent(sliderContainer);
    sliderC = createSlider(1, 10, 5, 0.1).style('width', '150px').style('height', '20px').parent(sliderContainer);
}

function draw() {
    background(0, 20); // Fading effect
    
    fill(255);
    textSize(16);
    text(`Version: ${versionNumber}`, 10, 30); // Display version in top-left corner
    
    for (let shape of shapes) {
        shape.update();
        shape.display();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    // Prevent shapes from being added when clicking on sliders
    if (mouseY < height - 70) { // Adjusted to ensure space for sliders
        let s = new Shape(mouseX, mouseY); // Shapes spawn where clicked
        shapes.push(s);
    }
}

class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(20, 50);
        this.color = color(random(255), random(255), random(255));
        this.type = random(['circle', 'square', 'triangle']); // Random shape type
    }
    update() {
        let a = sliderA.value();
        let b = sliderB.value();
        let c = sliderC.value();
        this.x += sin(frameCount * 0.01 * a) * b;
        this.y += cos(frameCount * 0.01 * b) * c;
    }
    display() {
        fill(this.color);
        noStroke();
        if (this.type === 'circle') {
            ellipse(this.x, this.y, this.size);
        } else if (this.type === 'square') {
            rectMode(CENTER);
            rect(this.x, this.y, this.size, this.size);
        } else if (this.type === 'triangle') {
            triangle(this.x, this.y - this.size / 2, 
                     this.x - this.size / 2, this.y + this.size / 2, 
                     this.x + this.size / 2, this.y + this.size / 2);
        }
    }
}
