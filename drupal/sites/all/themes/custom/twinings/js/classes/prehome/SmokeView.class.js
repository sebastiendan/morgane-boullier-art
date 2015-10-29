function SmokeView(){
}
SmokeView._extends(AbstractView);

SmokeView.prototype.init = function(tag, parent){
  SmokeView._super.init.call(this, tag, parent);
  this.frameCount = 100;
  this.fps = 25;
};

SmokeView.prototype.loadImages = function(callback) {
  this.loadCompleteCallback = callback;
  var path_media = 'sites/all/themes/custom/twinings/images/';
  this.loader = new PIXI.loaders.Loader();
  var num;
  var i=0;
  for(i=0;i<this.frameCount;i++){
    num = ''+i;
    while(num.length < 3){
      num = '0'+num;
    }
    this.loader.add('smoke'+i, path_media + 'prehome-cup/smoke/' + num + '.jpg');
  }
  this.loader.once('complete', jQuery.proxy(this.onLoadComplete, this));
  this.loader.load();
};

SmokeView.prototype.onLoadComplete = function() {
  this.textures = [];
  for(var i=0;i<this.frameCount;i++){
    this.textures.push(this.loader.resources['smoke'+i].texture);
  }

  this.container = new PIXI.Container();

  this.data = [];
  this.data.push({frame:1, alpha:0});
  this.data.push({frame:(1+this.frameCount/2)%this.frameCount, alpha:0});

  this.current = 0;
  this.loadCompleteCallback();
};

SmokeView.prototype.start = function() {
  var d = new Date();
  this.t0 = d.getTime();
  this.globalAlpha = 0;
  jQuery(this).velocity({globalAlpha:1}, {duration:1000});
};

SmokeView.prototype.onRender = function() {
  var d = new Date();
  var dt = ((d.getTime() - this.t0)/1000);
  var frame = dt * this.fps;
  this.data[0]['frame'] = Math.round(frame)%this.frameCount;
  var sin = Math.sin(frame * Math.PI/(2 * this.frameCount));
  this.data[0]['alpha'] = this.globalAlpha * sin * sin;

  frame = frame+this.frameCount/2;
  this.data[1]['frame'] = Math.round(frame)%this.frameCount;
  var sin = Math.sin(frame * Math.PI/(2 * this.frameCount));
  this.data[1]['alpha'] = this.globalAlpha * sin * sin;

//    this.mcs[0].gotoAndStop((this.mcs[0].currentFrame+1)%this.frameCount);
//  this.mcs[1].gotoAndStop((this.mcs[0].currentFrame+this.frameCount/2)%this.frameCount);
};
