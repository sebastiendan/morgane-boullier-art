function BulletPopupView() {
  this.visibleBannerHeight = 10;
}
BulletPopupView._extends(AbstractView);

BulletPopupView.prototype.init = function (tag, parent) {
  BulletPopupView._super.init.call(this, tag, parent);

  this.$popupGroup = this.$tag.find('.group-popup');
  this.$popupBck = jQuery('#popup-bck');
  this.$closeButton = this.$tag.find('#close-button');
  this.$bulletButton = this.$tag.find('#bullet-button');

  this.bind(this.$closeButton, 'click', this.onCloseButtonClick);
  this.bind(this.$bulletButton, 'click', this.onBulletButtonClick);
  this.bind(this.$popupBck, 'click', this.onPopupBckClick);
  this.bind(jQuery(window), 'resize', this.onStageResize);

  this.onStageResize();
};

BulletPopupView.prototype.onStageResize = function() {
  var $body = jQuery('body');
  this.$popupBck.css({'width':$body.width(), 'height':$body.height()});
};

BulletPopupView.prototype.onPopupBckClick = function() {
  this.hide();
};

BulletPopupView.prototype.onCloseButtonClick = function() {
  this.hide();
};

BulletPopupView.prototype.onBulletButtonClick = function() {
  this.onStageResize();
  this.show();
};

BulletPopupView.prototype.show = function() {
  this.$popupBck.fadeIn(400);
  this.$popupGroup.fadeIn(400);
};

BulletPopupView.prototype.hide = function() {
  this.$popupBck.fadeOut(400);
  this.$popupGroup.fadeOut(400);
};