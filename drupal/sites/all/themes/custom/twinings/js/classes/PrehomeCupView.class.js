function PrehomeCupView(){

}
PrehomeCupView._extends(AbstractView);

PrehomeCupView.prototype.destroy = function() {
  jQuery('html').css({'overflow': 'auto'});
  this.$tag.remove();
};

PrehomeCupView.prototype.init = function(tag, parent){
  PrehomeCupView._super.init.call(this, tag, parent);

  this.$backgroundCanvas = this.$tag.find('canvas.background');
  this.$container = this.$tag.find('.block__content');
  this.$content = this.$container.find('.prehome');
  this.$smoke = this.$tag.find('canvas.smoke');
  this.canvasWidth = this.$smoke.width();
  this.canvasHeight = this.$smoke.height();
  this.ctx = this.$smoke[0].getContext('2d');

  this.tempCanvas = jQuery('<canvas width="' + this.canvasWidth + '" height="' + this.canvasHeight + '"></canvas>')[0];
  this.tempCtx = this.tempCanvas.getContext('2d');
  this.smokeFrameCount = 100;


  jQuery('html').css({'overflow': 'hidden'});
  this.$smoke.css({'opacity': 0});

  this.bind(StageSizeController.getInstance().model, StageSizeEvent.STAGE_RESIZE, this.onStageResize);
  this.onStageResize();

  this.backgroundLoader = new PIXI.loaders.Loader();
  this.backgroundLoader.add('background', this.$container.css('background-image').replace('url(','').replace(')',''));
  this.backgroundLoader.once('complete', jQuery.proxy(this.onBackgroundLoadComplete, this));
  this.backgroundLoader.load();


  var path_media = 'sites/all/themes/custom/twinings/images/';
  this.loader = new PIXI.loaders.Loader();
  var num;
  var i=0;
  for(i=0;i<100;i++){
    num = ''+i;
    while(num.length < 3){
      num = '0'+num;
    }
    this.loader.add('smoke'+i, path_media + 'prehome-cup/smoke/' + num + '.jpg');
  }
  this.loader.once('complete', jQuery.proxy(this.onLoadComplete, this));
  this.loader.load();
};

PrehomeCupView.prototype.onBackgroundLoadComplete = function() {
  this.backgroundCtx = this.$backgroundCanvas[0].getContext('2d');
  this.backgroundPattern = this.backgroundCtx.createPattern(this.backgroundLoader.resources['background'].texture.baseTexture.source, 'repeat');
  this.backgroundCtx.fillStyle = this.backgroundPattern;
  this.backgroundCtx.fillRect(0, 0, this.$backgroundCanvas.width(), this.$backgroundCanvas.height());
  this.$container.css('background', 'none');
};

PrehomeCupView.prototype.onLoadComplete = function() {
  var textures = [];

  var ctx = this.$smoke[0].getContext('2d');
  var w = this.$smoke.width();
  var h = this.$smoke.height();
  for(var i=0;i<this.smokeFrameCount;i++){
    textures.push(this.loader.resources['smoke'+i].texture);
  }

  this.stage = new PIXI.Container();
  this.renderer = PIXI.autoDetectRenderer(this.$smoke.width(), this.$smoke.height(), {
    transparent: true,
    view: this.$smoke[0]
  },true);

  this.mc = new PIXI.extras.MovieClip(textures);
  this.stage.addChild(this.mc);
  this.mc.gotoAndPlay(1);

  this.renderProxy = jQuery.proxy(this.render, this);
  var d = new Date();
  this.dt = d.getTime();
  this.render();

  this.$smoke.velocity({opacity:1});
};

PrehomeCupView.prototype.getAlpha = function(img, reverse) {
  var a;
  var w = this.canvasWidth;
  var h = this.canvasHeight;
  this.tempCtx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
  var RGBA = this.tempCtx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
  for (var i = 3, len = RGBA.data.length; i < len; i = i + 4){
    a = (RGBA.data[i-1] + RGBA.data[i-2] + RGBA.data[i-3])/3;
    RGBA.data[i-1] = RGBA.data[i-2] = RGBA.data[i-3] = 255;
    RGBA.data[i] = reverse? 255 - a: a;
  }
  return RGBA;
};

PrehomeCupView.prototype.render = function() {
  if(this.smokeFrameCount - 25 <= this.mc.currentFrame && !this.hiding){
    this.hide();
  }
  this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  this.ctx.putImageData(this.getAlpha(this.mc.texture.baseTexture.source), 0, 0);
//  this.renderer.render(this.stage);
  requestAnimationFrame(this.renderProxy);
};

PrehomeCupView.prototype.hide = function() {
  this.hiding = true;
  this.$content.velocity({
    'opacity':0
  },{
    duration: 1000,
    progress: jQuery.proxy(this.onHideProgress, this),
    complete: jQuery.proxy(this.destroy, this),
  });
};

PrehomeCupView.prototype.onHideProgress = function(elements, complete, remaining, start, tweenValue) {
  var frame = Math.floor(complete*this.smokeFrameCount);
  if(frame < this.smokeFrameCount){
    var bw = this.$backgroundCanvas.width();
    var bh = this.$backgroundCanvas.height();
    var img = this.loader.resources['smoke'+frame].texture.baseTexture.source;
    this.tempCtx.putImageData(this.getAlpha(img, true), 0, 0);
    this.backgroundCtx.clearRect(0,0, bw, bh);
    var s = [bw / this.canvasWidth, bh / this.canvasHeight];
    this.backgroundCtx.scale(s[0], s[1]);
    this.backgroundCtx.drawImage(this.tempCanvas, 0, 0);
    this.backgroundCtx.globalCompositeOperation = 'source-in';
    this.backgroundCtx.scale(1/s[0], 1/s[1]);
    this.backgroundCtx.fillStyle = this.backgroundPattern;
    this.backgroundCtx.fillRect(0, 0, this.$backgroundCanvas.width(), this.$backgroundCanvas.height());
    this.backgroundCtx.globalCompositeOperation = 'source-over';
  }
};

PrehomeCupView.prototype.onStageResize = function() {
  var size = StageSizeController.getInstance().model.size;
  this.$tag.css({width:size[0], height:size[1]});
  this.$backgroundCanvas.attr('width', size[0]);
  this.$backgroundCanvas.attr('height', size[1]);
};
