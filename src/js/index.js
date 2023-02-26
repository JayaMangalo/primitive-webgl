const line = document.getElementById('line');
const square = document.getElementById('square');
const rectangle = document.getElementById('rectangle');
const polygon = document.getElementById('polygon');
const end_polygon = document.getElementById('end_polygon')
const changecolor = document.getElementById('changecolor');

const resize = document.getElementById('resize');
const lock = document.getElementById('lock');

const translasi = document.getElementById('translasi');

const save = document.getElementById('save');
const load = document.getElementById('load');


const sliderX = document.getElementById('sliderX');
const sliderY = document.getElementById('sliderY');
var selected = null;

//MODELS
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
        removeCanvasEventListener(selected)
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
        removeCanvasEventListener(selected)
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
        removeCanvasEventListener(selected)
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
        removeCanvasEventListener(selected)
        selected = null;
    }
})

end_polygon.addEventListener('click', endCreatePolygon)

//TOOLS
changecolor.addEventListener('click',function() {
    if (selected != "changecolor") {
        //SELECT
        if(selected != null) {
            document.getElementById(selected).removeAttribute("class","selected");
            removeCanvasEventListener(selected)
        }
        changecolor.setAttribute("class","selected")
        canvas.addEventListener("mousedown", changeColor);
        selected = "changecolor";

    } else {
        //DESELECT
        changecolor.removeAttribute("class","selected")
        removeCanvasEventListener(selected)
        selected = null;
    }
})

resize.addEventListener('click',function() {
    if (selected != "resize") {
        //SELECT
        if(selected != null) {
            document.getElementById(selected).removeAttribute("class","selected");
            removeCanvasEventListener(selected)
        }
        resize.setAttribute("class","selected")

        canvas.addEventListener("mousedown", objectPicker);
        sliderX.addEventListener("input",sliderChangePointX);
        sliderY.addEventListener("input",sliderChangePointY);

        selected = "resize";

    } else {
        //DESELECT
        
        resize.removeAttribute("class","selected")
        removeCanvasEventListener(selected)
        selected = null;
    }
})

translasi.addEventListener('click',function() {
    if (selected != "translasi") {
        //SELECT
        if(selected != null) {
            document.getElementById(selected).removeAttribute("class","selected");
            removeCanvasEventListener(selected)
        }
        translasi.setAttribute("class","selected")

        canvas.addEventListener("mousedown", objectPicker);
        sliderX.addEventListener("input", sliderTranslationX);
        sliderY.addEventListener("input", sliderTranslationY);

        selected = "translasi";

    } else {
        //DESELECT
        translasi.removeAttribute("class","selected")
        removeCanvasEventListener(selected)
        selected = null;
    }
})
// save.addEventListener('click',function(){
    // DOSOMETHING
// })

// load.addEventListener('click',function(){
    // DOSOMETHING
// })
lock.addEventListener('click',function(){
    if(isLocked){
        lock.removeAttribute("class","selected")
        isLocked = false
    }else{
        lock.setAttribute("class","selected")
        isLocked = true
    }
})

function removeCanvasEventListener(selected) {
    if (selected == "line") {
        canvas.removeEventListener("mousedown", createLine);
    } else if (selected == "square") {
        canvas.removeEventListener("mousedown", createSquare);
    } else if (selected == "rectangle") {
        canvas.removeEventListener("mousedown", createRectangle);
    } else if (selected == "polygon") {
        canvas.removeEventListener("mousedown", createPolygon);
    } else if (selected == "changecolor") {
        canvas.removeEventListener("mousedown", changeColor);
    } else if (selected == "resize"){
        sliderX.removeEventListener("input",sliderChangePointX);
        sliderY.removeEventListener("input",sliderChangePointY);
        canvas.removeEventListener("mousedown", objectPicker);
    } else if (selected == "translasi"){
        sliderX.removeEventListener("input",sliderTranslationX);
        sliderY.removeEventListener("input",sliderTranslationY);
        canvas.removeEventListener("mousedown", objectPicker);
    }
}