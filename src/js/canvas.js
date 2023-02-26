var canvas = document.getElementById("gl-canvas");
// Create a WebGL rendering context  
var gl = canvas.getContext("webgl2");
// Tell user if their browser does not support WebGL
if (!gl) {
    alert("Your browser does not support WebGL");
}

gl.clearColor(0, 0.6, 0.4, 1);
// Clear the color buffer with specified color
gl.clear(gl.COLOR_BUFFER_BIT);

var program = gl.createProgram();// Create a shader program object to store combined shader program
setupShader(gl,program)

function setupShader(gl,program){
    var vertCode =
    `attribute vec2 coordinates; 
     attribute vec3 vertColor;

     uniform mat4 translationMatrix;
     uniform vec2 translation;

     varying vec3 outColor;
    
     void main() {
        outColor = vertColor;
        gl_Position = vec4(coordinates,0.0, 1.0);}
    `;

    var vertShader = gl.createShader(gl.VERTEX_SHADER);//Create a vertex shader object
    gl.shaderSource(vertShader, vertCode);//Attach vertex shader source code
    gl.compileShader(vertShader);//Compile the vertex shader

    //Fragment shader source code
    var fragCode =     
        `precision mediump float;
         varying vec3 outColor;

         void main() {gl_FragColor = vec4(outColor,1);}
         `;

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);// Create fragment shader object
    gl.shaderSource(fragShader, fragCode);// Attach fragment shader source code
    gl.compileShader(fragShader);// Compile the fragment shader
    
    gl.attachShader(program, vertShader); // Attach a vertex shader
    gl.attachShader(program, fragShader); // Attach a fragment shader
    gl.linkProgram(program);// Link both programs
    gl.useProgram(program);// Use the combined shader program object
}