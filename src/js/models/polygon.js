class Polygon{
    constructor(coordinates,color){
        this.coordinatesdata = []
        for(var i = 0; i < coordinates.length; i++) {
            this.coordinatesdata.push(coordinates[i][0]);
            this.coordinatesdata.push(coordinates[i][1]);
        }
        let colordata = []
        for(var i=0; i<this.coordinatesdata.length/2; i++) {
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

    setCenterX() {
        this.centerx = 0
        for (var i = 0; i < this.coordinatesdata.length/2; i++) {
            this.centerx += this.coordinatesdata[2*i]
        }
        this.centerx = this.centerx/(this.coordinatesdata.length/2);
    }

    setCenterY() {
        this.centery = 0
        for (var i = 0; i < this.coordinatesdata.length/2; i++) {
            this.centery += this.coordinatesdata[2*i + 1]
        }
        this.centery = this.centery/(this.coordinatesdata.length/2);
    }

    translationX(coordinateX) {
        this.setCenterX()
        for (var i = 0; i < this.coordinatesdata.length/2; i++) {
            let distanceX = Math.abs(this.coordinatesdata[i*2] - this.centerx)

            if (this.coordinatesdata[i*2] > this.centerx) {
                this.coordinatesdata[i*2] = coordinateX + distanceX
            } else {
                this.coordinatesdata[i*2] = coordinateX - distanceX
            }
        }
        this.vertexAttributes.position.data = this.coordinatesdata

        gl.bindBuffer(gl.ARRAY_BUFFER,  this.VBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(this.vertexAttributes.position.data), gl.STATIC_DRAW);
    }

    translationY(coordinateY) {
        this.setCenterY()
        for (var i = 0; i < this.coordinatesdata.length/2; i++) {
            let distanceY = Math.abs(this.coordinatesdata[i*2 + 1] - this.centery)

            if (this.coordinatesdata[i*2 + 1] > this.centery) {
                this.coordinatesdata[i*2 + 1] = coordinateY + distanceY
            } else {
                this.coordinatesdata[i*2 + 1] = coordinateY - distanceY
            }
        }
        this.vertexAttributes.position.data = this.coordinatesdata

        gl.bindBuffer(gl.ARRAY_BUFFER,  this.VBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(this.vertexAttributes.position.data), gl.STATIC_DRAW);
    }

    dilatationX(idx,coordinateX){
        let distcurr = this.coordinatesdata[idx*2]  
        let distnew = coordinateX
        let ratio = distnew/distcurr
        for (let i = 0; i < this.coordinatesdata.length/2; i++) {
            this.coordinatesdata[i*2] = (this.coordinatesdata[i*2]) * ratio
            this.coordinatesdata[(i*2)+1] = (this.coordinatesdata[(i*2)+1]) * ratio
        }

        this.vertexAttributes.position.data = this.coordinatesdata

        gl.bindBuffer(gl.ARRAY_BUFFER,  this.VBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(this.vertexAttributes.position.data), gl.STATIC_DRAW);
    }

    dilatationY(idx,coordinateY){
        let distcurr = - this.coordinatesdata[idx*2]  
        let distnew = - coordinateY

        let ratio = distnew/distcurr
        for (let i = 0; i < this.coordinatesdata.length/2; i++) {
            this.coordinatesdata[i*2] = (this.coordinatesdata[i*2]) * ratio
            this.coordinatesdata[(i*2)+1] = (this.coordinatesdata[(i*2)+1]) * ratio
        }

        this.vertexAttributes.position.data = this.coordinatesdata

        gl.bindBuffer(gl.ARRAY_BUFFER,  this.VBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(this.vertexAttributes.position.data), gl.STATIC_DRAW);
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