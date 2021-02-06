let gridSize = 20;
let snapSize = gridSize;
let grid_height = 600
let grid_weight = 500

document.querySelector(`#front`).width = grid_weight
document.querySelector(`#front`).height = grid_height
document.querySelector(`#back`).width = grid_weight
document.querySelector(`#back`).height = grid_height

let canvas = new fabric.Canvas('front', {
    backgroundColor: "white",
    stopContextMenu: true,
    perPixelTargetFind: false,
    selection: false,
});
let canvas2 = new fabric.Canvas('back', {
    backgroundColor: "white",
    stopContextMenu: true,
    perPixelTargetFind: false,
    selection: false,
});


function Grid(canvas) {
    let line = {
        stroke: '#ccc',
        hasBorders: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingFlip: true,
        lockScalingX: true,
        lockScalingY: true,
        lockSkewingX: true,
        lockSkewingY: true,

        selectable: false,
        hoverCursor: "default",
        moveCursor: "default",
    }
    for (let i = 0; i < (grid_weight / gridSize); i++) { //vert
        canvas.add(new fabric.Line([i * gridSize, 0, i * gridSize, grid_height], line));
    }
    for (let i = 0; i < (grid_height / gridSize); i++) { //hor
        canvas.add(new fabric.Line([0, i * gridSize, grid_weight, i * gridSize], line))
    }
}

Grid(canvas)
Grid(canvas2)

canvas.add(new fabric.Textbox("Лицевая сторона", {
    width: 280,
    fontSize: 35,
    left: 0,
}))
canvas2.add(new fabric.Textbox("Обратная сторона", {
    width: 280,
    fontSize: 35,
    left: 0,
}))

canvas.add(new fabric.Rect({
    left: 100,
    top: 100,
    width: 60,
    height: 60,
    fill: '#faa',
    originX: 'left',
    originY: 'top',
    centeredRotation: true,
    lockScalingFlip: true,
    lockScalingX: true,
    lockScalingY: true,
    lockSkewingX: true,
    lockSkewingY: true,
}));

circle1 = new fabric.Circle({
    left: 260,
    top: 300,
    radius: 80,
    fill: '#9f9',
    originX: 'left',
    originY: 'top',
    lockRotation: true,
    lockScalingFlip: true,
    lockScalingX: true,
    lockScalingY: true,
    lockSkewingX: true,
    lockSkewingY: true,
})
canvas.add(circle1);
let circle2 = fabric.util.object.clone(circle1)
canvas2.add(circle2);

circle2.left = grid_weight - circle1.left - circle2.width
circle2.top = circle1.top


function Snap(value) {
    return Math.round(value / snapSize) * snapSize;
}

function SnapMoving(object) {
    object.target.set({
        left: Snap(object.target.left),
        top: Snap(object.target.top)
    });
    if (canvas.getActiveObject() == circle1) {
        circle2.left = grid_weight - object.target.left - circle2.width
        circle2.top = object.target.top

        if (circle2.left + circle2.width > grid_weight) {
            circle2.left = grid_weight - circle2.width
        }
        if (circle2.left < 0) {
            circle2.left = 0
        }
        if (circle2.top + circle2.height > grid_height) {
            circle2.top = grid_height - circle2.height
        }
        if (circle2.top < 0) {
            circle2.top = 0
        }

    } else if (canvas2.getActiveObject() == circle2) {
        circle1.left = grid_weight - object.target.left - circle1.width
        circle1.top = object.target.top

        if (circle1.left + circle1.width > grid_weight) {
            circle1.left = grid_weight - circle1.width
        }
        if (circle1.left < 0) {
            circle1.left = 0
        }
        if (circle1.top + circle1.height > grid_height) {
            circle1.top = grid_height - circle1.height
        }
        if (circle1.top < 0) {
            circle1.top = 0
        }
    }

    if (object.target.left + object.target.width > grid_weight) {
        object.target.left = grid_weight - object.target.width
    }
    if (object.target.left < 0) {
        object.target.left = 0
    }
    if (object.target.top + object.target.height > grid_height) {
        object.target.top = grid_height - object.target.height
    }
    if (object.target.top < 0) {
        object.target.top = 0
    }

    canvas.renderAll();
    canvas2.renderAll();
}

function Moved() {
    canvas2.discardActiveObject();
    canvas.discardActiveObject();
    canvas.setActiveObject(circle1)
    canvas2.setActiveObject(circle2)
    canvas2.discardActiveObject();
    canvas.discardActiveObject();
    canvas.renderAll();
    canvas2.renderAll();
}

function Render(object) {
    canvas.renderAll();
    canvas2.renderAll();
}

function SnapScaling(object) {
    let target = object.target;
    let pointer = object.pointer;
    let px = Snap(pointer.x);
    let py = Snap(pointer.y);
    let rx = (px - target.left) / target.width;
    let by = (py - target.top) / target.height;
    let lx = (target.left - px + (target.width * target.scaleX)) / (target.width);
    let ty = (target.top - py + (target.height * target.scaleY)) / (target.height);
    let a = {};
    switch (target.__corner) {
        case "tl":
            break;
        case "mt":
            a = {
                scaleY: ty,
                top: py
            };
            break;
        case "tr":
            break;
        case "ml":
            a = {
                scaleX: lx,
                left: px
            };
            break;
        case "mr":
            a = {
                scaleX: rx
            };
            break;
        case "bl":
            break;
        case "mb":
            a = {
                scaleY: by
            };
            break;
        case "br":
            a = {
                scaleX: rx,
                scaleY: by
            };
            break;
    }
    object.target.set(a);
}


canvas.on({
    "object:moving": SnapMoving,
    "object:scaling": SnapScaling,
    "object:moved": Moved,
    "selection:cleared": Render,
    "selection:updated": Render,
    "selection:created": Render,
    "mouse:over": Render,
    "mouse:out": Render,
});
canvas2.on({
    "object:moving": SnapMoving,
    "object:scaling": SnapScaling,
    "object:moved": Moved,
    "selection:cleared": Render,
    "selection:updated": Render,
    "selection:created": Render,
    "mouse:over": Render,
    "mouse:out": Render,
});


// console.log(canvas.item(0))
console.log(canvas.getObjects())

Moved()