    var coordinates = [];
    var lObjects = [];

    const colorpicker = document.getElementById('colorpicker');

    let CANVAS_OFFSET_X = 100; //THIS IS A FIX FOR THE CANVAS GETTING PUSHED RIGHT DOWN BY TOOLBARS, NOT THE BEST FIX BUT WORKS
    let CANVAS_OFFSET_Y = 60;
    function getCoordinate(event){
        return [2*(event.clientX-CANVAS_OFFSET_X)/canvas.width-1,(2*(canvas.height-event.clientY+CANVAS_OFFSET_Y)/canvas.height)-1];
    }

    function createLine(event){
        coordinate  = getCoordinate(event)
        coordinates.push(coordinate)

        if(coordinates.length == 2){
            model = new Line(coordinates,getColor());
            coordinates = [];
            
            lObjects.push(model);
            render()
        }
    }
    
    function createRectangle(event){
            coordinate  = getCoordinate(event)
            coordinates.push(coordinate)

            if(coordinates.length == 2){
                model = new Rectangle(coordinates,getColor());
                coordinates = [];
                
                lObjects.push(model);
                render()
            }
            
    }
    function createSquare(event){
            coordinate  = getCoordinate(event)
            coordinates.push(coordinate)

            if(coordinates.length == 2){
                model = new Square(coordinates,getColor());
                coordinates = [];
                
                lObjects.push(model);
                render()
            }
            
    }

    function createPolygon(event){
        coordinate  = getCoordinate(event)
        coordinates.push(coordinate)
        console.log(coordinate)
    }

    function endCreatePolygon() {
        console.log("end create")
        console.log()
        model = new Polygon(coordinates,getColor());
        coordinates = [];
        
        lObjects.push(model);
        render()
    }
    
    function render() {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0.6, 0.4, 1);
        gl.clear( gl.COLOR_BUFFER_BIT );
        
        for(var i=0; i<lObjects.length; i++) {
            lObjects[i].render()
        }
    }
    var object = null
    var idxpicked = null
    canvas.addEventListener("mousedown", objectPicker);
    function objectPicker(event){
        let coordinate = getCoordinate(event)
        if(lObjects.length != 0){
            object = lObjects[lObjects.length-1]
            idxpicked = object.getClosestPointId(coordinate)
        }
    }
    
    function getColor(){
        hex = colorpicker.value
        rgb = ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
        
        dividedNum = num => num/255;
        rgb_divided = rgb.map(dividedNum);

        return rgb_divided
    }
    function changeColor(){
        if(object!=null){
            object.changeColor(idxpicked,getColor())
            render()
        }
    }

    function getSliderPointX(){
        var val = sliderX.value/100
        return val;
    }
    function sliderChangePointX(){
        if(object!=null){
            object.changePointbyX(idxpicked,getSliderPointX())
            render()
        }
    }

    function getSliderPointY(){
        var val = sliderY.value/100
        return val;
    }
    function sliderChangePointY(){
        if(object!=null){
            object.changePointbyY(idxpicked,getSliderPointY())
            render()
        }
    }

