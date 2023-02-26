    var coordinates = [];
    var lObjects = [];

    const colorpicker = document.getElementById('colorpicker');
    const bound = canvas.getBoundingClientRect()

    let CANVAS_OFFSET_X = bound.left; //THIS IS A FIX FOR THE CANVAS GETTING PUSHED RIGHT DOWN BY TOOLBARS, NOT THE BEST FIX BUT WORKS
    let CANVAS_OFFSET_Y = bound.top;
    function getCoordinate(event){
        return [2*(event.clientX-CANVAS_OFFSET_X)/canvas.width-1,(2*(canvas.height-event.clientY+CANVAS_OFFSET_Y)/canvas.height)-1];
    }

    function createLine(event){
        coordinate  = getCoordinate(event)
        coordinates.push(coordinate)

        if(coordinates.length == 2){
            model = new Line(coordinates,getColor(),false);
            coordinates = [];
            
            lObjects.push(model);
            render()
        }
    }
    
    function createRectangle(event){
            coordinate  = getCoordinate(event)
            coordinates.push(coordinate)

            if(coordinates.length == 2){
                model = new Rectangle(coordinates,getColor(),false);
                coordinates = [];
                
                lObjects.push(model);
                render()
            }
            
    }
    function createSquare(event){
            coordinate  = getCoordinate(event)
            coordinates.push(coordinate)

            if(coordinates.length == 2){
                model = new Square(coordinates,getColor(),false);
                coordinates = [];
                
                lObjects.push(model);
                render()
            }
            
    }

    function createPolygon(event){
        coordinate  = getCoordinate(event)
        coordinates.push(coordinate)
    }

    function endCreatePolygon() {
        if (coordinates.length <= 2) {
            coordinates = [];
            return
        }
        model = new Polygon(coordinates,getColor(),false);
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

    var isLocked = false;
    function getSliderPointX(){
        var val = sliderX.value/100
        return val;
    }
    function sliderChangePointX(){
        if(object!=null){
            object.changePointbyX(idxpicked,getSliderPointX(),isLocked)
            render()
        }
    }
    function sliderTranslationX() {
        if(object!=null){
            object.translationX(getSliderPointX())
            render()
        }
    }

    function sliderTranslationY() {
        if(object!=null){
            object.translationY(getSliderPointY())
            render()
        }
    }

    function sliderDilatationX(){
        if(object!=null){
            object.dilatationX(idxpicked,getSliderPointX())
            render()
        }
    }

    function sliderDilatationY(){
        if(object!=null){
            object.dilatationY(idxpicked,getSliderPointY())
            render()
        }
    }

    function getSliderPointY(){
        var val = sliderY.value/100
        return val;
    }
    function sliderChangePointY(){
        if(object!=null){
            object.changePointbyY(idxpicked,getSliderPointY(),isLocked)
            render()
        }
    }

    function savelObjects() {
        let lObjectsJSON = []
        for(var i=0; i<lObjects.length; i++) {
            lObjectsJSON.push(lObjects[i].toJSON())
        }
        // save the objects to a JSON file
        let jsonString = JSON.stringify(lObjects);
        // Convert the JSON string to a Blob object
        var blob = new Blob([jsonString], { type: "application/json" });

        // Use the FileSaver.js library to prompt the user to save the file
        saveAs(blob, "objects.json");
    }

    function loadlObjects(event) {
        var file = event.target.files[0]; // Get the selected file
        var reader = new FileReader(); // Create a FileReader object
        reader.onload = function() {
            var fileContents = reader.result; // Get the contents of the file
            var objects = JSON.parse(fileContents); // Parse the JSON data
            for (let obj of objects) {
                switch (obj.type) {
                  case 'Line':
                    lObjects.push(Line.fromJSON(obj));
                    break;
                  case 'Rectangle':
                    lObjects.push(Rectangle.fromJSON(obj));
                    break;
                  case 'Square':
                    lObjects.push(Square.fromJSON(obj));
                    break;
                  case 'Polygon':
                    lObjects.push(Polygon.fromJSON(obj));
                    break;
                  default:
                    console.error('Unknown object type:', obj.type);
                    break;
                }
              }
              render()
        };
        reader.readAsText(file); // Read the file as text
        }
