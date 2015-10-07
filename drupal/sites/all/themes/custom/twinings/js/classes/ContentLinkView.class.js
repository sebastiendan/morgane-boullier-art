function ContentLinkView() {
  this.visibleBannerHeight = 10;
}
ContentLinkView._extends(AbstractView);

ContentLinkView.prototype.init = function (tag, parent) {
  ContentLinkView._super.init.call(this, tag, parent);
  
  this.canvas = document.createElement('canvas');
  this.canvas.width = 270;
  this.canvas.height = 350;
  this.opacity = 1;
  this.ctx = this.canvas.getContext('2d');

  this.mask = new Image();
  this.mask.src = 'sites/all/themes/custom/twinings/images/content_link_shape.png';

  this.$image = this.$tag.find('.field--name-field-teaser-image img');

  jQuery(this.mask).load(jQuery.proxy(this.onMaskLoaded, this));
  this.$image.load(jQuery.proxy(this.onImageLoaded, this));

  this.bind(this.$tag, 'mouseover', this.onMouseOver);
  this.bind(this.$tag, 'mouseout', this.onMouseOut);
};

ContentLinkView.prototype.onMaskLoaded = function() {
  this.maskLoaded = true;
  this.onLoaded();
};

ContentLinkView.prototype.onImageLoaded = function() {
  this.imageLoaded = true;
  this.onLoaded();
};

ContentLinkView.prototype.onLoaded = function() {
  if(this.maskLoaded && this.imageLoaded){
    this.x = (this.$image.width() - this.mask.width)/2;
    this.y = (this.$image.height() - this.mask.height)/2;

    this.ctx.drawImage(this.mask, 0, 0);
    this.ctx.globalCompositeOperation = 'source-in';
    this.ctx.drawImage(this.$image[0], -this.x, -this.y);
    this.ctx.globalCompositeOperation = 'source-over';

    this.$tag[0].appendChild(this.canvas);
  }
};

ContentLinkView.prototype.onMouseOver = function() {
  if (this.tween !== undefined) {
    this.start = this.tween.target.factor;
    this.tween.kill();
  } else {
    this.start = 0;
  }

  this.tween = TweenLite.to({factor: this.start},.4, {
    ease: Power1.easeInOut,
    factor: 1,
    onUpdate: jQuery.proxy(this.onCanvasUpdate, this)
  });
};

ContentLinkView.prototype.onMouseOut = function() {
  if (this.tween !== undefined) {
    this.start = this.tween.target.factor;
    this.tween.kill();
  } else {
    this.start = 1;
  }

  this.tween = TweenLite.to({factor: this.start},.4, {
    ease: Power1.easeInOut,
    factor: 0,
    onUpdate: jQuery.proxy(this.onCanvasUpdate, this)
  });
};

ContentLinkView.prototype.onCanvasUpdate = function() {
  var x = this.mask.width / 2;
  var y = this.mask.height / 2;
  var width = (1 + this.tween.target.factor/8)*this.$image.attr('width');
  var height = (1 + this.tween.target.factor/8)*this.$image.attr('height');
  var angle = this.tween.target.factor*Math.PI/15*0;

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.drawImage(this.mask, 0, 0);
  this.ctx.globalCompositeOperation = 'source-in';
  this.ctx.translate(x, y);
  this.ctx.rotate(angle);
  this.ctx.drawImage(this.$image[0], -width/2, -height/2, width, height);
  this.ctx.rotate(-angle);
  this.ctx.translate(-x, -y);
  this.ctx.globalCompositeOperation = 'source-over';
};