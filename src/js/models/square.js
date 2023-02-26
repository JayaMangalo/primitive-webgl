class Square{
    constructor(coordinates,color){
        this.coordinates=coordinates;
        this.color=color;
        
        let x1 = coordinates[0][0];
        let y1 = coordinates[0][1];
        let xtemp = coordinates[1][0];
        let ytemp = coordinates[1][1];

        let distance = Math.max(Math.abs(x1-xtemp),Math.abs(y1-ytemp))

        let x2;
        let y2;
        if(xtemp>x1){
            x2 = x1+distance
        }else{
            x2 = x1-distance
        }
        if(ytemp>y1){
            y2 = y1+distance
        }else{
            y2 = y1-distance
        }

        this.coordinatesdata = [x1,y1,x1,y2,x2,y2,x2,y1]
        this.centerx = (x1+x2)/2;
        this.centery = (y1+y2)/2;

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

    getClosestPointId(coordinate){
        let min = 99999
        let currid = 0
        let curr = 0
        for (let i = 0; i < 4; i++) {
            curr = Math.pow((coordinate[0] - this.coordinatesdata[i*2]),2) + Math.pow(coordinate[1] - this.coordinatesdata[(i*2)+1],2)
            if (min > curr){
                min  = curr
                currid = i
            }
        }
        return currid
    }

    changeColor(idx,color){
        this.vertexAttributes.color.data[idx*3]=color[0]
        this.vertexAttributes.color.data[(idx*3)+1]=color[1]
        this.vertexAttributes.color.data[(idx*3)+2]=color[2]
        gl.bindBuffer(gl.ARRAY_BUFFER,  this.CBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(this.vertexAttributes.color.data), gl.STATIC_DRAW);
    }

    changePointbyX(idx,coordinateX,isLocked){
        if(isLocked){
            let distcurr = this.centerx - this.coordinatesdata[idx*2]  
            let distnew = this.centerx - coordinateX

            let ratio = distnew/distcurr
            for (let i = 0; i < 4; i++) {
                this.coordinatesdata[i*2] = this.centerx + (this.coordinatesdata[i*2]-this.centerx) * ratio
                this.coordinatesdata[(i*2)+1] = this.centery + (this.coordinatesdata[(i*2)+1]-this.centery) * ratio
            }
        }else{
            this.coordinatesdata[idx*2] = coordinateX
            (this.centerx = this.coordinatesdata[0]+this.coordinatesdata[4])/2;
        }
        this.vertexAttributes.position.data = this.coordinatesdata

        gl.bindBuffer(gl.ARRAY_BUFFER,  this.VBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(this.vertexAttributes.position.data), gl.STATIC_DRAW);
    }

    changePointbyY(idx,coordinateY,isLocked){
        if(isLocked){
            let distcurr = this.centery- this.coordinates[(idx*2)+1]
            let distnew = this.centery - coordinateY  

            let ratio = distnew/distcurr

            for (let i = 0; i < 4; i++) {
                this.coordinatesdata[i*2] = this.centerx + (this.coordinatesdata[i*2]-this.centerx) * ratio
                this.coordinatesdata[(i*2)+1] = this.centery + (this.coordinatesdata[(i*2)+1]-this.centery) * ratio
            }
        }else{
            this.coordinatesdata[(idx*2)+1] = coordinateY
            this.centery = (this.coordinatesdata[1]+this.coordinatesdata[5])/2;
        }
        this.vertexAttributes.position.data = this.coordinatesdata

        gl.bindBuffer(gl.ARRAY_BUFFER,  this.VBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(this.vertexAttributes.position.data), gl.STATIC_DRAW);
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
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);
    }

}