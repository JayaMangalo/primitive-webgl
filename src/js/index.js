const line = document.getElementById('line');
const square = document.getElementById('square');
const rectangle = document.getElementById('rectangle');
const polygon = document.getElementById('polygon');

const save = document.getElementById('save');
const load = document.getElementById('load');

var selected = null;

line.addEventListener('click',function() {
    if(selected != "line") {
        //SELECT
        if(selected != null) {
            document.getElementById(selected).removeAttribute("class","selected");
            removeCanvasEventListener(selected)
        }
        line.setAttribute("class","selected")
        canvas.addEventListener("mousedown", createLine);
        selected = "line";
    } else {
        //DESELECT
        line.removeAttribute("class","selected")
        canvas.removeEventListener("mousedown", createLine);
        selected = null;
    }
})

square.addEventListener('click',function() {
    if (selected != "square") {
        //SELECT
        if(selected != null) {
            document.getElementById(selected).removeAttribute("class","selected");
            removeCanvasEventListener(selected)
        }
        square.setAttribute("class","selected")
        canvas.addEventListener("mousedown", createSquare);
        selected = "square";

    } else {
        //DESELECT
        square.removeAttribute("class","selected")
        canvas.removeEventListener("mousedown", createSquare);
        selected = null;
    }
})

rectangle.addEventListener('click',function() {
    if (selected != "rectangle") {
        //SELECT
        if(selected != null) {
            document.getElementById(selected).removeAttribute("class","selected");
            removeCanvasEventListener(selected)
        }
        rectangle.setAttribute("class","selected")
        canvas.addEventListener("mousedown", createRectangle);
        selected = "rectangle";

    } else {
        //DESELECT
        rectangle.removeAttribute("class","selected")
        canvas.removeEventListener("mousedown", createRectangle);
        selected = null;
    }
})

polygon.addEventListener('click',function() {
    if (selected != "polygon") {
        //SELECT
        if(selected != null) {
            document.getElementById(selected).removeAttribute("class","selected");
            removeCanvasEventListener(selected)
        }
        polygon.setAttribute("class","selected")
        canvas.addEventListener("mousedown", createPolygon);
        selected = "polygon";

    } else {
        //DESELECT
        polygon.removeAttribute("class","selected")
        canvas.removeEventListener("mousedown", createPolygon);
        selected = null;
    }
})

// save.addEventListener('click',function(){
    // DOSOMETHING
// })

// load.addEventListener('click',function(){
    // DOSOMETHING
// })


function removeCanvasEventListener(selected) {
    if (selected == "line") {
        canvas.removeEventListener("mousedown", createLine);
    } else if (selected == "square") {
        canvas.removeEventListener("mousedown", createSquare);
    } else if (selected == "rectangle") {
        canvas.removeEventListener("mousedown", createRectangle);
    } else if (selected == "polygon") {
        canvas.removeEventListener("mousedown", createPolygon);
    }
}