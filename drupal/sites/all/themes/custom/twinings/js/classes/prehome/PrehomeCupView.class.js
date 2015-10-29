function PrehomeCupView(){

}
PrehomeCupView._extends(AbstractView);

PrehomeCupView.prototype.destroy = function() {
  this.unbind(StageSizeController.getInstance().model, StageSizeEvent.STAGE_RESIZE, this.onStageResize);

  jQuery('html').css({'overflow': 'auto'});
  this.$tag.remove();
  this.destroyed = true;
};

PrehomeCupView.prototype.init = function(tag, parent){
  PrehomeCupView._super.init.call(this, tag, parent);

  this.$backgroundCanvas = this.$tag.find('canvas.background');
  this.$backgroundOverlay = this.$tag.find('.background-overlay');
  this.$container = this.$tag.find('.block__content');
  this.$content = this.$container.find('.prehome');
  this.$smoke = this.$tag.find('canvas.smoke');
  this.canvasWidth = this.$smoke.width();
  this.canvasHeight = this.$smoke.height();
  this.ctx = this.$smoke[0].getContext('2d');

  this.tempCanvas = jQuery('<canvas width="' + this.canvasWidth + '" height="' + this.canvasHeight + '"></canvas>')[0];
  this.tempCtx = this.tempCanvas.getContext('2d');

  this.smokeView = new SmokeView();
  this.smokeView.init(this.$smoke, this);

  jQuery('html').css({'overflow': 'hidden', 'opacity':0});
  this.$smoke.css({'opacity': 0});

  this.bind(StageSizeController.getInstance().model, StageSizeEvent.STAGE_RESIZE, this.onStageResize);
  this.onStageResize();

  this.backgroundLoader = new PIXI.loaders.Loader();
  this.backgroundLoader.add('background', this.$container.css('background-image').replace('url(','').replace(')',''));
  this.backgroundLoader.once('complete', jQuery.proxy(this.onBackgroundLoadComplete, this));
  this.backgroundLoader.load();

  this.$slider = jQuery('<input class="debug" type="range" min="0" max="1000" value="0"/>');
  this.$slider.css({'position':'fixed', 'top':'50px', 'left':'50px'});
  this.$tag.append(this.$slider);
  this.bind(this.$slider, 'change mousemouve', this.onSliderChange);
};

PrehomeCupView.prototype.onSliderChange = function(e){
  console.log(this.$slider.val());
  this.processBackground(this.$slider.val()/1000);
};

PrehomeCupView.prototype.onBackgroundLoadComplete = function() {
  jQuery('html').css({'opacity':1});
  this.backgroundCtx = this.$backgroundCanvas[0].getContext('2d');
  this.backgroundPattern = this.backgroundCtx.createPattern(this.backgroundLoader.resources['background'].texture.baseTexture.source, 'repeat');
  this.backgroundCtx.fillStyle = this.backgroundPattern;
  this.backgroundCtx.fillRect(0, 0, this.$backgroundCanvas.width(), this.$backgroundCanvas.height());
  this.$container.css('background', 'none');

  this.smokeView.loadImages(jQuery.proxy(this.onLoadComplete, this));
};

PrehomeCupView.prototype.onLoadComplete = function() {
  this.renderProxy = jQuery.proxy(this.render, this);
  this.smokeView.start();
  this.render();
  this.$smoke.velocity({opacity:1});

  setTimeout(jQuery.proxy(this.hide, this), 1000);
};

PrehomeCupView.prototype.getAlpha = function(img, reverse, globalAlpha) {
  var a;
  var w = this.canvasWidth;
  var h = this.canvasHeight;
  this.tempCtx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
  var RGBA = this.tempCtx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
  for (var i = 3, len = RGBA.data.length; i < len; i = i + 4){
    a = globalAlpha * (RGBA.data[i-1] + RGBA.data[i-2] + RGBA.data[i-3])/3;
    RGBA.data[i-1] = RGBA.data[i-2] = RGBA.data[i-3] = 255;
    RGBA.data[i] = reverse? 255 - a: a;
  }
  return RGBA;
};

PrehomeCupView.prototype.render = function() {
  this.smokeView.onRender();

  this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  var texture = this.smokeView.textures[this.smokeView.data[0]['frame']];
  this.ctx.putImageData(this.getAlpha(texture.baseTexture.source, false, 0.6 * this.smokeView.data[0]['alpha']), 0, 0);
  texture = this.smokeView.textures[this.smokeView.data[1]['frame']];
  this.tempCtx.putImageData(this.getAlpha(texture.baseTexture.source, false, 0.6 * this.smokeView.data[1]['alpha']), 0, 0);
  this.ctx.drawImage(this.tempCanvas, 0, 0);
  if(!this.destroyed){
    requestAnimationFrame(this.renderProxy);
  }
};

PrehomeCupView.prototype.hide = function() {
  this.hiding = true;
  this.$content.velocity({
    'opacity':0
  },{
    duration: 2000,
    progress: jQuery.proxy(this.onHideProgress, this),
    complete: jQuery.proxy(this.destroy, this),
  });
};

PrehomeCupView.prototype.onHideProgress = function(elements, complete, remaining, start, tweenValue) {
  var frame = Math.floor(complete*this.smokeView.frameCount);
  if(frame < this.smokeView.frameCount){
    this.processBackground(frame / this.smokeView.frameCount);
  }
};

PrehomeCupView.prototype.processBackground = function(percent) {
  this.$backgroundOverlay.css({opacity:(1-percent)});
  var frame = Math.floor(percent*this.smokeView.frameCount);
  var bw = this.$backgroundCanvas.width();
  var bh = this.$backgroundCanvas.height();
  var img = this.smokeView.textures[frame].baseTexture.source;
  this.tempCtx.putImageData(this.getAlpha(img, true, 1+percent), 0, 0);
  this.backgroundCtx.clearRect(0,0, bw, bh);
  var s = [bw / this.canvasWidth, bh / this.canvasHeight];
  var coef = 10*percent;
  this.backgroundCtx.translate(((bw - bw*(1+coef))/2) / s[0]+coef, ((bh - bh*(1+coef))) / s[1]+coef);
  this.backgroundCtx.scale(s[0]+coef, s[1]+coef);
  this.backgroundCtx.drawImage(this.tempCanvas, 0, 0);
  this.backgroundCtx.globalCompositeOperation = 'source-in';
  this.backgroundCtx.setTransform(1, 0, 0, 1, 0, 0);
  this.backgroundCtx.fillStyle = this.backgroundPattern;
  this.backgroundCtx.fillRect(0, 0, bw, bh);
  this.backgroundCtx.globalCompositeOperation = 'source-over';
};

PrehomeCupView.prototype.onStageResize = function() {
  var size = StageSizeController.getInstance().model.size;
  this.$tag.css({width:size[0], height:size[1]});
  this.$backgroundCanvas.attr('width', size[0]);
  this.$backgroundCanvas.attr('height', size[1]);
};
