function game(id){
	this.id=id;
	this.vs=document.getElementById(this.id);
	this.ctx=this.vs.getContext("2d");
	this.data();
}

game.prototype.data=function(){
	this.speed=0;
	this.px=0;
	this.p={};
	this.food={};
	this.d=null;
	this.left=0;
	this.right=0;
	this.left=0;
	this.up=0;
	this.canWidth=null;
	this.canHeight=null;
	this.snakeArray=null;
	this.time=null;
	this.init();
	this.f=false;
	
}

game.prototype.init=function(){
	this.canWidth=this.vs.width;
	this.canHeight=this.vs.height;
	this.speed=100;
	this.px=20;
	this.food={"x":-1,"y":-1};
	this.snakeArray=[];
	this.up=38;
	this.down=40;
	this.left=37;
	this.right=39;
	this.d=this.right;
	this.f=false;
	this.initSnake(5);
	this.keydown();
	this.play();
	this.timer();
}
game.prototype.play=function(){
	this.ctx.clearRect(0,0,this.canWidth,this.canHeight);
	this.initFood();
	this.drawFood();
	this.drawSnake();
	this.moveSnake();
}
game.prototype.initFood=function(){
	if(!this.f){
		this.food["x"]=Math.floor(this.canWidth/this.px*Math.random());
		this.food["y"]=Math.floor(this.canWidth/this.px*Math.random());
		this.f=true;
	}
	
}
game.prototype.drawFood=function(){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.fillStyle='red';
		this.ctx.fillRect(this.food["x"]*this.px,this.food["y"]*this.px,this.px-1,this.px-1);
		this.ctx.fill();
		this.ctx.closePath();
		this.ctx.restore();
		if(this.f){
			return;
		}
		
}
game.prototype.initSnake=function(length){
	for(var i=length;i>0;i--){
		this.snakeArray.push({"x":i,"y":0});
	}
}
game.prototype.drawSnake=function(){
	for(var i=0;i<this.snakeArray.length;i++){
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.fillStyle='blue';
		this.ctx.fillRect(this.snakeArray[i].x*this.px,this.snakeArray[i].y*this.px,this.px-1,this.px-1);
		this.ctx.fill();
		this.ctx.closePath();
		this.ctx.restore();
	}
}
game.prototype.timer=function(){
	var _this=this;
	this.time=window.setInterval(function(){
		_this.play();
	},_this.speed);
}
game.prototype.moveSnake=function(){
	this.p={"x":this.snakeArray[0].x,"y":this.snakeArray[0].y};
	if(this.d==this.right)this.p.x++;
	if(this.d==this.left)this.p.x--;
	if(this.d==this.up)this.p.y--;
	if(this.d==this.down)this.p.y++;
	if(this.p.x==this.food.x&&this.p.y==this.food.y){
		this.initFood();
		for(var i=0;i<this.snakeArray.length;i++){
			if(this.snakeArray[i].x==this.food.x&&this.snakeArray[i].y==this.food.y){
				this.initFood();
			}
		}
		this.f=false;
	}
	else{
		this.snakeArray.pop();
	}
	console.log(this.p.x)
	if(this.p.x==this.canWidth/this.px||this.p.y==this.canHeight/this.px||this.p.x==-1||this.p.y==-1||this.checkSnake(this.p.x,this.p.y)){
		alert("游戏结束");
		window.clearInterval(this.time);
		this.data();
	}
	this.snakeArray.unshift(this.p);
		
	
	
	
	
}
game.prototype.keydown=function(){
	var _this=this;
	document.body.onkeydown=function(e){
		if(e.keyCode==_this.right&&_this.d!=_this.left){
			_this.d=_this.right;
		}
		else if(e.keyCode==_this.left&&_this.d!=_this.right){
			_this.d=_this.left;
		}
		else if(e.keyCode==_this.up&&_this.d!=_this.down){
			_this.d=_this.up;
		}
		else if(e.keyCode==_this.down&&_this.d!=_this.up){
			_this.d=_this.down;
		}
	}
}
game.prototype.checkSnake=function(x,y){
	for(var i=0;i<this.snakeArray.length;i++){
		if(x==this.snakeArray[i].x&&y==this.snakeArray[i].y){
			return true;
		}
	}
}
window.onload=function(){
	var snakeGame=new game("vs");
}
