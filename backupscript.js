// sources : https://blog.howlingmoon.dev/posts/AwooCAD---An-Exploration-in-WebGL-(and-OpenGL-in-general)

// Setup canvas
const canvas = document.getElementById('gl-canvas');
const canvascontainer = document.getElementById("canvas");// GUA GATAU KNP GET ELEMENTS BY CLASS NAME GABISA 
// canvas.width = canvascontainer.clientWidth;   // THIS BREAKS A LOT, HARUS DI FIX
// canvas.height = canvascontainer.clientWidth;
const gl = canvas.getContext('webgl2');
if (!gl) {
    alert("Your browser does not support WebGL bro, so sad");
}
// color of canvas
gl.clearColor(0.8,0.8,0.8,1);
gl.clear(gl.COLOR_BUFFER_BIT);

// learn to make triangle
// consists of 3 points or vertices
const triangleData = [
    -1.0, 0.0,
    1.0, 0.0,
    0.0, 1.0
  ];

// vertex shader
const vert = `attribute vec2 a_pos;

void main() {
  gl_Position = vec4(a_pos, 0, 1);
}`

const vertShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertShader, vert)
gl.compileShader(vertShader)

// fragment shader
const frag = `precision mediump float;

uniform vec4 u_fragColor;
void main() {
  gl_FragColor = u_fragColor;
}`

const fragShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragShader, frag)
gl.compileShader(fragShader)

// program shader
const shaderProgram = gl.createProgram()
gl.attachShader(shaderProgram, vertShader)
gl.attachShader(shaderProgram, fragShader)
gl.linkProgram(shaderProgram)

// binding data
// buffer object
const vertBuf = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertBuf)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleData), gl.STATIC_DRAW)

// to use
gl.useProgram(shaderProgram) // always use the program on the beginning
const vertexPos = gl.getAttribLocation(shaderProgram, 'a_pos')
const uniformCol = gl.getUniformLocation(shaderProgram, 'u_fragColor');
gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0);
gl.uniform4fv(uniformCol, [0.0, 0.0, 0.0, 1.0])
gl.enableVertexAttribArray(vertexPos)
gl.drawArrays(gl.TRIANGLES, 0, triangleData.length/2)
