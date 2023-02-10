console.log("1")

const line = document.getElementById('line');
console.log("2")
const square = document.getElementById('square');
const rectangle = document.getElementById('rectangle');
const polygon = document.getElementById('polygon');
const save = document.getElementById('save');
const load = document.getElementById('load');

var selected = null;

line.addEventListener('click',function(){
    if(selected == "line"){
        //DESELECT
        line.removeAttribute("class","selected")
        selected = null;
    }else{
        //SELECT
        if(selected!=null){
            document.getElementById(selected).removeAttribute("class","selected");
        }
        line.setAttribute("class","selected")
        selected = "line";
    }
})

square.addEventListener('click',function(){
    if(selected == "square"){
        //DESELECT
        square.removeAttribute("class","selected")
        selected = null;
    }else{
        //SELECT
        if(selected!=null){
            document.getElementById(selected).removeAttribute("class","selected");
        }
        square.setAttribute("class","selected")
        console.log("ree")
        selected = "square";
    }
})

rectangle.addEventListener('click',function(){
    if(selected == "rectangle"){
        //DESELECT
        rectangle.removeAttribute("class","selected")
        selected = null;
    }else{
        //SELECT
        if(selected!=null){
            document.getElementById(selected).removeAttribute("class","selected");
        }
        rectangle.setAttribute("class","selected")
        selected = "rectangle";
    }
})

polygon.addEventListener('click',function(){
    if(selected == "polygon"){
        //DESELECT
        polygon.removeAttribute("class","selected")
        selected = null;
    }else{
        //SELECT
        if(selected!=null){
            document.getElementById(selected).removeAttribute("class","selected");
        }
        polygon.setAttribute("class","selected")
        selected = "polygon";
    }
})

// save.addEventListener('click',function(){
//     if(selected == "save"){
//         //DESELECT
//         selected = null;
//     }else{
//         //SELECT
//         selected = "save";
//     }
// })

// load.addEventListener('click',function(){
//     if(selected == "load"){
//         //DESELECT
//         selected = null;
//     }else{
//         //SELECT
//         selected = "load";
//     }
// })