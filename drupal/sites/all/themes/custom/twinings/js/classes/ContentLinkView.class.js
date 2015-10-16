function ContentLinkView() {
  this.visibleBannerHeight = 10;
}
ContentLinkView._extends(AbstractView);

ContentLinkView.prototype.init = function (tag, parent) {
  ContentLinkView._super.init.call(this, tag, parent);

  this.factor = 0;
  this.mask = new Image();
  this.mask.src = 'sites/all/themes/custom/twinings/images/content_link_shape.png';

  this.$image = this.$tag.find('.field--name-field-teaser-image img');
  this.image = new Image();
  this.image.src = this.$image.attr('src');

  jQuery(this.mask).load(jQuery.proxy(this.onMaskLoaded, this));
  jQuery(this.image).load(jQuery.proxy(this.onImageLoaded, this));

  this.bind(this.$tag, 'mouseover', this.onMouseOver);
  this.bind(this.$tag, 'mouseout', this.onMouseOut);
};

ContentLinkView.prototype.onMaskLoaded = function () {
  this.maskLoaded = true;
  this.onLoaded();
};

ContentLinkView.prototype.onImageLoaded = function () {
  this.imageLoaded = true;
  this.onLoaded();
};

ContentLinkView.prototype.onLoaded = function () {
  if (this.maskLoaded && this.imageLoaded) {
    this.createCanvases();
    this.$tag[0].appendChild(this.canvas);
    this.onCanvasUpdate();
  }
};

ContentLinkView.prototype.createCanvases = function () {
  this.canvas = document.createElement('canvas');
  this.canvas.width = 270;
  this.canvas.height = 350;
  this.ctx = this.canvas.getContext('2d');

  this.photoCanvas = document.createElement('canvas');
  this.photoCanvas.width = this.canvas.width;
  this.photoCanvas.height = this.canvas.height;
  this.photoCtx = this.photoCanvas.getContext('2d');

  this.colorCanvas = document.createElement('canvas');
  this.colorCanvas.width = this.canvas.width;
  this.colorCanvas.height = this.canvas.height;
  this.colorCtx = this.colorCanvas.getContext('2d');
  this.colorCtx.drawImage(this.image, 0, 0);

  this.blackWhiteCanvas = document.createElement('canvas');
  this.blackWhiteCanvas.width = this.canvas.width;
  this.blackWhiteCanvas.height = this.canvas.height;
  this.blackWhiteCtx = this.blackWhiteCanvas.getContext('2d');
  this.blackWhiteCtx.drawImage(this.image, 0, 0);
  var imgData = this.blackWhiteCtx.getImageData(0, 0, this.blackWhiteCanvas.width, this.blackWhiteCanvas.height);
  var pixels  = imgData.data;
  for (var i = 0, n = pixels.length; i < n; i += 4) {
    var grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
    pixels[i  ] = grayscale;
    pixels[i+1] = grayscale;
    pixels[i+2] = grayscale;
  }
  this.blackWhiteCtx.putImageData(imgData, 0, 0);
};

ContentLinkView.prototype.onMouseOver = function () {
  if (this.tween !== undefined) {
    this.tween.kill();
  }

  this.tween = TweenLite.to(this, .4, {
    ease: Power1.easeInOut,
    factor: 1,
    onUpdate: jQuery.proxy(this.onCanvasUpdate, this)
  });
};

ContentLinkView.prototype.onMouseOut = function () {
  if (this.tween !== undefined) {
    this.tween.kill();
  }

  this.tween = TweenLite.to(this, .4, {
    ease: Power1.easeInOut,
    factor: 0,
    onUpdate: jQuery.proxy(this.onCanvasUpdate, this)
  });
};

ContentLinkView.prototype.onCanvasUpdate = function () {
  var x = this.mask.width / 2;
  var y = this.mask.height / 2;
  var width = (1 + this.factor / 12) * this.photoCanvas.width;
  var height = (1 + this.factor / 12) * this.photoCanvas.height;

  this.photoCtx.clearRect(0, 0, this.photoCanvas.width, this.photoCanvas.height);
  this.photoCtx.drawImage(this.blackWhiteCanvas, 0, 0);
  this.photoCtx.globalAlpha = this.factor;
  this.photoCtx.drawImage(this.colorCanvas, 0, 0);
  this.photoCtx.globalAlpha = 1;

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.drawImage(this.mask, 0, 0);
  this.ctx.globalCompositeOperation = 'source-in';
  this.ctx.translate(x, y);
  this.ctx.drawImage(this.photoCanvas, -width / 2, -height / 2, width, height);
  this.ctx.translate(-x, -y);
  this.ctx.globalCompositeOperation = 'source-over';
};