// don't have inputs just to show how animation is done.
function GameLoopPattern(requestedFPS){
  document.body.innerHTML = "";
  this.canvas = document.createElement("canvas");
  this.canvas.width = 100;
  this.canvas.height = 100;
  this.canvas.style.backgroundColor = "white";
  document.body.appendChild(this.canvas);
  this.canvasContext = this.canvas.getContext("2d");

  this.position = 0;
  this.requestedFPS = requestedFPS;
  this.lastFrameTime = performance.now();
	
}

// update position.
GameLoopPattern.prototype.update = function(){
  this.position = this.position > 100? 0 : this.position+1;
}

// render new frame
GameLoopPattern.prototype.render = function(){
  this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.canvasContext.beginPath();
  this.canvasContext.rect(this.position, this.position, 20, 20);
  this.canvasContext.stroke();
  this.canvasContext.closePath();
}

//not to lose scope "self" is required here. Otherwise requestAnimationFrame changes scope to "window" from "this" as GameLoopPattern instance. 
GameLoopPattern.prototype.loopGame = function(self){
  var currentFrameTime = performance.now();
  if(currentFrameTime - self.lastFrameTime < 1000 / self.requestedFPS){
	requestAnimationFrame(function(){self.loopGame(self)});
    return;
  }
  
  self.lastFrameTime = currentFrameTime;
  self.update();
  self.render();
  requestAnimationFrame(function(){self.loopGame(self)});
}

var gameLoop = new GameLoopPattern(30);
gameLoop.loopGame(gameLoop);