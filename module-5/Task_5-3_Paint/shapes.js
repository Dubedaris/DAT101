"use strict";
import { TPoint } from "lib2d";
import { newShapeType } from "./paint.mjs";
import { EShapeType } from "./menu.js";


// 🖼️ Access the paint canvas and drawing context, move this to your new JavaScript file.
const cvsPaint = document.getElementById("cvsPaint");
const ctxPaint = cvsPaint.getContext("2d");

let mousePos = new TPoint();
let shape = null;
let shapes = [];
let shapeNum = 0;
let selectedHtmlShape = null;

const paintObjectListOption = '<div id="divPaintObject" class="paintObject">Shape-1</div>'
const paintObjectList = document.getElementById("paintObjectList");

class TShape {
    #name;

    constructor(aX, aY, aName) {

        this.posStart = new TPoint(aX, aY);
        this.posEnd = null;
        this.lineWidth = newShapeType.StrokeSize;
        this.strokeStyle = newShapeType.StrokeColor;
        this.fillStyle = newShapeType.FillColor;
        this.#name = aName;
        this.htmlID = `Shape-${shapeNum++}`;
    }

    draw() {
        ctxPaint.lineWidth = this.lineWidth;
        ctxPaint.strokeStyle = this.strokeStyle;
        ctxPaint.fillStyle = this.fillStyle;
    } //polymorphic
    setEndPos(aX, aY) {
        this.posEnd = new TPoint(aX, aY);
        const div = document.createElement("div");
        div.name="paint-shape-object";
        div.classList.add("paintObject");
        div.id = this.htmlID;
        div.onclick = selectShape;
        div.appendChild(
            document.createTextNode(this.#name)
        );
        paintObjectList.appendChild(div);
    }
} // TShape END

export class TLineShape extends TShape {

    constructor(aX, aY) {
        super(aX, aY, "Line");

    }

    draw() {
        super.draw();
        ctxPaint.beginPath();
        ctxPaint.moveTo(this.posStart.x, this.posStart.y);
        if (this.posEnd) {
            ctxPaint.lineTo(this.posEnd.x, this.posEnd.y);
        } else {
            ctxPaint.lineTo(mousePos.x, mousePos.y);
        }
        ctxPaint.stroke();
    }
} // TLineShape END

export class TCircleShape extends TShape {
    #radius;

    constructor(aX, aY) {
        super(aX, aY, "Circle");
        this.#radius = 0;

    }

    draw() {
        super.draw();
        ctxPaint.beginPath();
        //ctxPaint.moveTo(this.posStart.x, this.posStart.y);
        if (!this.posEnd) {
            this.#calcRadius();
        }
        ctxPaint.arc(this.posStart.x, this.posStart.y, this.#radius, 0, 2 * Math.PI)
        ctxPaint.stroke();
        ctxPaint.fill();
    }
    #calcRadius() {
        const dx = mousePos.x - this.posStart.x;
        const dy = mousePos.y - this.posStart.y;
        let hyp = Math.pow(dx, 2) + Math.pow(dy, 2);
        hyp = Math.sqrt(hyp);
        this.#radius = hyp;
    }
} // TCircleShape END

export class TEllipseShape extends TShape {
    #radiusX;
    #radiusY;

    constructor(aX, aY) {
        super(aX, aY, "Ellipse");
        this.#radiusX = 0;
        this.#radiusY = 0;
    }

    draw() {
        super.draw();
        ctxPaint.beginPath();
        if (!this.posEnd) {
            this.#calcRadius();
        }
        ctxPaint.ellipse(this.posStart.x, this.posStart.y,
            this.#radiusX, this.#radiusY,
            0, 0, 2 * Math.PI)
        ctxPaint.stroke();
        ctxPaint.fill();
    }
    #calcRadius() {
        const dx = Math.abs(mousePos.x - this.posStart.x);
        const dy = Math.abs(mousePos.y - this.posStart.y);
        this.#radiusX = dx;
        this.#radiusY = dy;
    }
} // TEllipseShape END

export class TRectangleShape extends TShape {
    #width;
    #height;

    constructor(aX, aY) {
        super(aX, aY, "Rectangle");
        this.#width = 0;
        this.#height = 0;
    }

    draw() {
        super.draw();
        ctxPaint.beginPath();
        //ctxPaint.moveTo(this.posStart.x, this.posStart.y);
        if (!this.posEnd) {
            this.#calcSize();
        }
        ctxPaint.rect(this.posStart.x, this.posStart.y, this.#width, this.#height);
        ctxPaint.stroke();
        ctxPaint.fill();
    }
    #calcSize() {
        this.#width = mousePos.x - this.posStart.x;
        this.#height = mousePos.y - this.posStart.y;

    }
} // TRectangleShape END

export class TFreeShape extends TShape {
    #points;

    constructor(aX, aY) {
        super(aX, aY, "Pen");
        this.#points = [];
    }
    addPos(aX, aY) {
        const pos = new TPoint(aX, aY);
        this.#points.push(pos);
    }
    draw() {
        super.draw();
        ctxPaint.beginPath();
        ctxPaint.moveTo(this.posStart.x, this.posStart.y);

        for (let i = 0; i < this.#points.length; i++) {
            const pos = this.#points[i];
            ctxPaint.lineTo(pos.x, pos.y);
        }

        if (this.posEnd) {
            ctxPaint.lineTo(this.posEnd.x, this.posEnd.y);
        }
        ctxPaint.stroke();
    }
} // TFreeShape END

export class TPolygonShape extends TShape {
    #points;

    constructor(aX, aY) {
        super(aX, aY, "Polygon");
        this.#points = [];
        this.snap = false;
    }
    addPos(aX, aY) {
        const pos = new TPoint(aX, aY);
        this.#points.push(pos);
    }
    draw() {
        super.draw();
        ctxPaint.beginPath();
        ctxPaint.moveTo(this.posStart.x, this.posStart.y);

        for (let i = 0; i < this.#points.length; i++) {
            const pos = this.#points[i];
            ctxPaint.lineTo(pos.x, pos.y);
        }

        if (this.posEnd) {
            ctxPaint.lineTo(this.posEnd.x, this.posEnd.y);
            ctxPaint.fill();
        } else {
            ctxPaint.lineTo(mousePos.x, mousePos.y);
        }
        ctxPaint.stroke();
        
    }


} // TPolygonShape END

function updateMousePos(aEvent) {
    const rect = cvsPaint.getBoundingClientRect();
    mousePos.x = Math.round(aEvent.clientX - rect.left);
    mousePos.y = Math.round(aEvent.clientY - rect.top);

    if ((shape !== null)) {
        if (newShapeType.ShapeType === EShapeType.Pen) {
            shape.addPos(mousePos.x, mousePos.y);
        } else if (newShapeType.ShapeType === EShapeType.Polygon) {
            if (shape.posEnd === null) {
                const dx = shape.posStart.x - mousePos.x;
                const dy = shape.posStart.y - mousePos.y;
                const hyp = Math.hypot(dx, dy);
                if (hyp <= 5) {
                    mousePos.x = shape.posStart.x;
                    mousePos.y = shape.posStart.y;
                    shape.snap = true;
                } else {
                    shape.snap = false;
                }
            }
        }
    }

}

function mouseDown(aEvent) {
    updateMousePos(aEvent);
    if (shape === null) {
        switch (newShapeType.ShapeType) {
            case EShapeType.Line:
                shape = new TLineShape(mousePos.x, mousePos.y);
                break;
            case EShapeType.Circle:
                shape = new TCircleShape(mousePos.x, mousePos.y);
                break;
            case EShapeType.Oval:
                shape = new TEllipseShape(mousePos.x, mousePos.y);
                break;
            case EShapeType.Rectangle:
                shape = new TRectangleShape(mousePos.x, mousePos.y);
                break;
            case EShapeType.Pen:
                shape = new TFreeShape(mousePos.x, mousePos.y);
                break;
            case EShapeType.Polygon:
                shape = new TPolygonShape(mousePos.x, mousePos.y);
                break;
        }

    } else if (newShapeType.ShapeType === EShapeType.Polygon) {
        if (shape.snap) {
            shape.setEndPos(mousePos.x, mousePos.y);
            shapes.push(shape);
            shape = null;
        } else {
            shape.addPos(mousePos.x, mousePos.y);
        }
    }
}

function mouseMove(aEvent) {
    updateMousePos(aEvent);

}

function mouseUp(aEvent) {

    updateMousePos(aEvent);
    if (shape !== null) {

        if (newShapeType.ShapeType !== EShapeType.Polygon) {
            shape.setEndPos(mousePos.x, mousePos.y);
            shapes.push(shape);
            shape = null;
        }

    }
}

function drawCanvas() {
    ctxPaint.clearRect(0, 0, cvsPaint.width, cvsPaint.height);
    if (shape) {
        shape.draw();
    }
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].draw();
    }
    requestAnimationFrame(drawCanvas);
}

export function newDrawing() {
    paintObjectList.innerHTML = "";
    shapes = [];
}

function selectShape(aEvent) {
    console.log(aEvent.target.id + " selected!");
    if(selectedHtmlShape) {
        selectedHtmlShape.classList.remove("selected");
    }
    selectedHtmlShape = aEvent.target;
    selectedHtmlShape.classList.add("selected");
}

export function deleteShape() {
    let index = -1;
    for(let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        if(shape.htmlID === selectedHtmlShape.id) {
            index = i;
            break;
        }
    }
    if(index >= 0) {
        shapes.splice(index, 1);
        paintObjectList.removeChild(selectedHtmlShape);
        selectedHtmlShape = null;
    }
}

export function moveDown() {
    let index = -1;
    let shape = null;
    for(let i = 0; i < shapes.length; i++) {
        shape = shapes[i];
        if(shape.htmlID === selectedHtmlShape.id) {
            index = i;
            break;
        }
    }
    if(index > 0) {
        shapes.splice(index, 1);
        shapes.splice(index-1, 0, shape);
        const previous = selectedHtmlShape.previousSibling;
        paintObjectList.insertBefore(selectedHtmlShape, previous)
    }
}

export function moveUp() {
    let index = -1;
    let shape = null;
    for(let i = 0; i < shapes.length; i++) {
        shape = shapes[i];
        if(shape.htmlID === selectedHtmlShape.id) {
            index = i;
            break;
        }
    }
    if(index < shapes.length -1) {
        shapes.splice(index, 1);
        shapes.splice(index +1, 0, shape);
        const next = selectedHtmlShape.nextSibling;
        paintObjectList.insertBefore(next, selectedHtmlShape);
    }
}

cvsPaint.addEventListener("mousedown", mouseDown);
cvsPaint.addEventListener("mouseup", mouseUp);
cvsPaint.addEventListener("mousemove", mouseMove);
drawCanvas();