class Polygon{
    constructor(coordinates,color,fromfile){
        this.coordinatesdata = []
        for(var i = 0; i < coordinates.length; i++) {
            this.coordinatesdata.push(coordinates[i][0]);
            this.coordinatesdata.push(coordinates[i][1]);
        }

        this.colordata=[]
        if (!fromfile){
            for(var i=0; i<this.coordinatesdata.length/2; i++) {
                this.colordata = this.colordata.concat(color)
            }        
        }else{
            this.colordata = color
        }
        

        this.vertexAttributes = {
            position: {
                numberOfComponents: 2, // X and Y ordered pair coordinates
                data: this.coordinatesdata
            },
            color: {
                numberOfComponents: 3, // RGB triple
                data: this.colordata
            }
        };
        
        this.initBuffers()
    }

    toJSON() {
        let coordinates = []
        for(var i = 0; i < this.coordinatesdata.length; i += 2) {
            coordinates.push([this.coordinatesdata[i], this.coordinatesdata[i+1]])
        }
        let color = this.colordata
        return {
            type: 'Polygon',
            coordinates: coordinates,
            color: color
        }
    }

    static fromJSON(json) {
        const { coordinates, color } = json;
        return new Polygon(coordinates, color,true);
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
        for (let i = 0; i < this.coordinatesdata.length/2; i++) {
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


    changePointbyX(idx,coordinateX,isLocked){
        if(isLocked){
            this.setCenterX()
            this.setCenterY()
            let distcurr = this.centerx - this.coordinatesdata[idx*2]  
            let distnew = this.centerx - coordinateX

            let ratio = distnew/distcurr
            console.log(this.coordinatesdata)
            for (let i = 0; i < this.coordinatesdata.length/2; i++) {
                
                this.coordinatesdata[i*2] = this.centerx + (this.coordinatesdata[i*2]-this.centerx) * ratio
                this.coordinatesdata[(i*2)+1] = this.centery + (this.coordinatesdata[(i*2)+1]-this.centery) * ratio
            }
            console.log(this.coordinatesdata)
        }else{
            this.coordinatesdata[idx*2] = coordinateX
            this.setCenterX()
        }
        this.vertexAttributes.position.data = this.coordinatesdata

        gl.bindBuffer(gl.ARRAY_BUFFER,  this.VBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(this.vertexAttributes.position.data), gl.STATIC_DRAW);
    }

    changePointbyY(idx,coordinateY,isLocked){
        if(isLocked){
            this.setCenterX()
            this.setCenterY()
            let distcurr = this.centery- this.coordinatesdata[(idx*2)+1]
            let distnew = this.centery - coordinateY  

            let ratio = distnew/distcurr

            for (let i = 0; i < this.coordinatesdata.length/2; i++) {
                this.coordinatesdata[i*2] = this.centerx + (this.coordinatesdata[i*2]-this.centerx) * ratio
                this.coordinatesdata[(i*2)+1] = this.centery + (this.coordinatesdata[(i*2)+1]-this.centery) * ratio
            }
        }else{
            this.coordinatesdata[(idx*2)+1] = coordinateY
            this.setCenterY()
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
        gl.drawArrays( gl.TRIANGLE_FAN, 0, this.coordinatesdata.length/2);
    }

}