const line = document.getElementById('line');
const square = document.getElementById('square');
const rectangle = document.getElementById('rectangle');
const polygon = document.getElementById('polygon');

const save = document.getElementById('save');
const load = document.getElementById('load');

var selected = null;

line.addEventListener('click',function(){
    // if(selected != "line"){
    //     //SELECT
    //     if(selected!=null){
    //         document.getElementById(selected).removeAttribute("class","selected");
    //     }
    //     line.setAttribute("class","selected")
    //     selected = "line";
        
    // }else{
    //     //DESELECT
        
    //     line.removeAttribute("class","selected")
    //     selected = null;
    // }
})

square.addEventListener('click',function(){
    if(selected != "square"){
        //SELECT
        if(selected!=null){
            document.getElementById(selected).removeAttribute("class","selected");
        }
        square.setAttribute("class","selected")
        selected = "square";

        canvas.addEventListener("mousedown", createSquare);

    }else{
        //DESELECT
        square.removeAttribute("class","selected")
        selected = null;
    }
})

rectangle.addEventListener('click',function(){
    if(selected != "rectangle"){
        //SELECT
        if(selected!=null){
            document.getElementById(selected).removeAttribute("class","selected");
        }
        rectangle.setAttribute("class","selected")
        selected = "rectangle";

        canvas.addEventListener("mousedown", createRectangle);

    }else{
        //DESELECT
        rectangle.removeAttribute("class","selected")
        selected = null;
    }
})

polygon.addEventListener('click',function(){
    // if(selected != "polygon"){
    //     //SELECT
    //     if(selected!=null){
    //         document.getElementById(selected).removeAttribute("class","selected");
    //     }
    //     polygon.setAttribute("class","selected")
    //     selected = "polygon";
        
    // }else{
    //     //DESELECT
    //     polygon.removeAttribute("class","selected")
    //     selected = null;
    // }
})

// save.addEventListener('click',function(){
    // DOSOMETHING
// })

// load.addEventListener('click',function(){
    // DOSOMETHING
// })