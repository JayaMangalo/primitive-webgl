class Polygon{
    constructor(coordinates,color){
        this.coordinatesdata = []
        console.log(this.coordinatesdata)
        for(var i = 0; i < coordinates.length; i++) {
            console.log(coordinates[i][0])
            console.log(coordinates[i][1])
            this.coordinatesdata.push(coordinates[i][0]);
            this.coordinatesdata.push(coordinates[i][1]);
        }
        console.log(this.coordinatesdata)
        let colordata = []
        for(var i=0; i<4; i++) {
            colordata = colordata.concat(color)
        }

        this.vertexAttributes = {
            position: {
                numberOfComponents: 2, // X and Y ordered pair coordinates
                data: this.coordinatesdata
            },
            color: {
                numberOfComponents: 3, // RGB triple
                data: colordata
            }
        };
        
        this.initBuffers()
    }

    initBuffers() {
        this.VBuffer = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER,this.VBuffer);
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(this.vertexAttributes.position.data), gl.STATIC_DRAW );
        this.positionAttribLocation = gl.getAttribLocation(program,'coordinates');

        this.CBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,  this.CBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(this.vertexAttributes.color.data), gl.STATIC_DRAW);
        this.colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    }

    changeColor(idx,color){
        this.vertexAttributes.color.data[idx*3]=color[0]
        this.vertexAttributes.color.data[(idx*3)+1]=color[1]
        this.vertexAttributes.color.data[(idx*3)+2]=color[2]
        gl.bindBuffer(gl.ARRAY_BUFFER,  this.CBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(this.vertexAttributes.color.data), gl.STATIC_DRAW);
    }
    bind(){
        gl.bindBuffer(gl.ARRAY_BUFFER,this.VBuffer);
        gl.vertexAttribPointer(this.positionAttribLocation,
            this.vertexAttributes.position.numberOfComponents,
                    gl.FLOAT, gl.FALSE, 0, 0);
        gl.enableVertexAttribArray(this.positionAttribLocation);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, this.CBuffer);
        gl.vertexAttribPointer(this.colorAttribLocation,
            this.vertexAttributes.color.numberOfComponents, gl.FLOAT,
                    gl.FALSE, 0, 0);
        gl.enableVertexAttribArray(this.colorAttribLocation);
    }
    render(){
        this.bind()
        gl.drawArrays( gl.TRIANGLE_FAN, 0, this.coordinatesdata.length/2);
    }

}