function HomeView() {
  this.visibleBannerHeight = 10;
}
HomeView._extends(AbstractView);

HomeView.prototype.init = function (tag, parent) {
  HomeView._super.init.call(this, tag, parent);

  this.bind(jQuery(window), 'beforeunload', this.onBeforeUnload);

  this.$playButton = this.$tag.find('.video-play-button');
  this.$headline = this.$tag.find('.group-headline');
  this.$videoContainer = this.$tag.find('.field--name-field-home-video');
  this.$scrollBanner = this.$tag.find('#block-main-home-scroll-banner');
  this.$groupContentLinks = this.$tag.find('.group-content-links');
  this.$groupHeadline = this.$tag.find('.group-headline');

  this.usedHeight = jQuery('.l-page').children('header').height() + this.visibleBannerHeight;
  this.id = this.$tag.find('.video-js').attr('id');

  this.player = videojs(this.id);
  this.player.ready(jQuery.proxy(this.onPlayerReady, this));
};

HomeView.prototype.onPlayerReady = function() {
  this.$player = jQuery('#'+ this.id);
  this.$poster = this.$player.find('.vjs-poster');
  this.initWidth = this.player.width();
  this.initHeight = this.player.height();

  this.bind(this.$playButton, 'click', this.onPlayButtonClick);
  this.bind(this.$player.find('video'), 'click', this.onVideoClick);
  this.player.on('ended', jQuery.proxy(this.onVideoEnd, this));
  this.bind(jQuery(window), 'scroll', this.onStageScroll);
  this.bind(jQuery(window), 'resize', this.onStageResize);

  this.onStageResize();
};

HomeView.prototype.onStageResize = function() {
  var ww = jQuery(window).width();
  var wh = jQuery(window).height();

  var scale = Math.max(ww / this.initWidth, (wh - this.usedHeight) / this.initHeight);
  this.player.width(this.initWidth*scale);
  this.player.height(this.initHeight*scale);
  this.$videoContainer.css({'width':ww, 'height':wh - this.usedHeight});

  this.$player.css({'top':(wh - this.usedHeight - this.player.height())/4, 'left':(ww - this.player.width())/2});
  this.$groupHeadline.offset({'top':(wh - this.usedHeight - this.$groupHeadline.height())/1.5});

  this.$scrollBanner.css({'top':wh - this.visibleBannerHeight});
};

HomeView.prototype.onStageScroll = function() {
  var wh = jQuery(window).height();
  var scroll = jQuery(document).scrollTop();

  this.$scrollBanner.css({'top':wh - this.visibleBannerHeight - scroll/2});
  this.$groupContentLinks.css({'top':wh - scroll/2 - this.usedHeight + this.$scrollBanner.height()});
};

HomeView.prototype.onPlayButtonClick = function() {
  this.play();
};

HomeView.prototype.onVideoClick = function() {
  this.pause();
};

HomeView.prototype.onVideoEnd = function() {
  this.$headline.show();
  this.$poster.show();
};

HomeView.prototype.play = function() {
  this.player.play();
  this.$headline.fadeOut(400);
};

HomeView.prototype.pause = function() {
  this.player.pause();
  this.$headline.fadeIn(400);
};