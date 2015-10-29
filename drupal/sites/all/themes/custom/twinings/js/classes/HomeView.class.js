function HomeView() {
  this.visibleBannerHeight = 10;
}
HomeView._extends(AbstractView);

HomeView.prototype.init = function (tag, parent) {
  HomeView._super.init.call(this, tag, parent);

  this.$playButton = this.$tag.find('.video-play-button');
  this.$videoContainer = this.$tag.find('.field--name-field-home-video');
  this.$groupHeadline = this.$tag.find('.group-headline');
  this.$groupHeaderInner = this.$tag.find('.group-header-inner');
  this.usedHeight = jQuery('.l-page').children('header').height() + this.visibleBannerHeight;

  this.autoPlay = location.search == '?video';

  if (this.$videoContainer.length > 0) {
    this.initHomeEvent();
  } else {
    this.initHomeNotEvent();
  }
};

HomeView.prototype.initHomeEvent = function() {
  this.id = this.$tag.find('.video-js').attr('id');

  this.player = videojs(this.id);
  this.player.ready(jQuery.proxy(this.onPlayerReady, this));
};

HomeView.prototype.initHomeNotEvent = function() {
  this.$image = this.$groupHeaderInner.find('.field--name-field-image img');
  this.image = new Image();
  this.image.src = this.$image.attr('src');

  this.$lines = this.$groupHeadline.find('.line');
  this.$link = this.$groupHeadline.find('.link-wrapper a');

  this.initWidth = this.$image.width();
  this.initHeight = this.$image.height();

  this.bind(jQuery(window), 'scroll', this.onStageScrollNotEvent);
  this.bind(jQuery(window), 'resize', this.onStageResizeNotEvent);

  jQuery(this.image).load(jQuery.proxy(this.onImageLoaded, this));
};

HomeView.prototype.onPlayerReady = function() {
  this.$player = jQuery('#'+ this.id);
  this.$poster = this.$player.find('.vjs-poster');
  this.initWidth = this.player.width();
  this.initHeight = this.player.height();

  this.bind(this.$playButton, 'click', this.onPlayButtonClick);
  this.bind(this.$player.find('video'), 'click', this.onVideoClick);
  this.bind(this.$player.find('video'), 'touch', this.onVideoClick);
  this.player.on('play', jQuery.proxy(this.onVideoPlay, this));
  this.player.on('pause', jQuery.proxy(this.onVideoPause, this));
  this.player.on('ended', jQuery.proxy(this.onVideoEnd, this));
  this.bind(jQuery(window), 'scroll', this.onStageScrollEvent);
  this.bind(jQuery(window), 'resize', this.onStageResizeEvent);

  if(this.autoPlay){
    this.player.play();
  }

  this.onStageResizeEvent();
};

HomeView.prototype.onImageLoaded = function() {
  this.$image.fadeIn(400);
  this.onStageResizeNotEvent();
};

HomeView.prototype.onStageResizeEvent = function() {

  var $window = jQuery(window);
  var ww = $window.width();
  var wh = $window.height();
  var scale = Math.max(ww / this.initWidth, (wh - this.usedHeight) / this.initHeight);

  this.player.width(this.initWidth*scale);
  this.player.height(this.initHeight*scale);
  this.$videoContainer.css({'width':ww});
  this.$player.css({'top':(wh - this.usedHeight - this.player.height())/4, 'left':(ww - this.player.width())/2});

  this.$groupHeaderInner.css({'height':wh - this.usedHeight});
};

HomeView.prototype.onStageResizeNotEvent = function() {
  var $window = jQuery(window);
  var ww = $window.width();
  var wh = $window.height();
  var scale = Math.max(ww / this.initWidth, (wh - this.usedHeight) / this.initHeight);

  this.$image.css({'width':this.initWidth*scale, 'height':this.initHeight*scale, 'top':(wh - this.usedHeight - this.initHeight*scale)/4, 'left':(ww - this.initWidth*scale)/2});
  this.$groupHeaderInner.css({'height':wh - this.usedHeight});

  this.$lines.css({'width': this.$link.offset().left - this.$groupHeadline.offset().left - 1});
};

HomeView.prototype.onStageScrollEvent = function() {
  var headlineTop = this.$groupHeadline[0].getBoundingClientRect().top;
  if (Main.isMobile()) {
    var limit = jQuery(window).height()/5;
  } else {
    var limit = jQuery(window).height()/3;
  }

  if (headlineTop !== 0 && headlineTop < limit) {
    if (this.player.currentTime() > 0 && !this.isVideoEnded) {
      this.player.pause();
      this.groupHeadlineHide();
    } else {
      this.groupHeadlineHide();
    }
  } else {
    if (this.player.currentTime() > 0 && !this.isVideoEnded && !this.isVideoPausedByClick) {
      this.player.play();
    } else {
      this.groupHeadlineShow();
    }
  }
};

HomeView.prototype.onStageScrollNotEvent = function() {
  var headlineTop = this.$groupHeadline[0].getBoundingClientRect().top;
  if (Main.isMobile()) {
    var limit = jQuery(window).height()/5;
  } else {
    var limit = jQuery(window).height()/3;
  }

  if (headlineTop !== 0 && headlineTop < limit) {
    this.groupHeadlineHide();
  } else {
    this.groupHeadlineShow();
  }
};

HomeView.prototype.onPlayButtonClick = function() {
  this.isVideoPausedByClick = false;
  this.player.play();
};

HomeView.prototype.onVideoClick = function() {
  this.isVideoPausedByClick = true;
  this.player.pause();
};

HomeView.prototype.onVideoEnd = function() {
  this.isVideoEnded = true;
  this.groupHeadlineShow();
  this.$poster.show();
};

HomeView.prototype.onVideoPlay = function() {
  this.isVideoEnded = false;
  this.groupHeadlineHide();
};

HomeView.prototype.onVideoPause = function() {
  this.groupHeadlineShow();
};

HomeView.prototype.groupHeadlineHide = function() {
  this.$groupHeadline.css({'opacity':0});
  this.isHeadlineShown = false;
  var me = this;
  setTimeout(function(){
    if (!me.isHeadlineShown) {
      me.$groupHeadline.css({'z-index':-1});
    }
  }, 400);
};

HomeView.prototype.groupHeadlineShow = function() {
  this.isHeadlineShown = true;
  this.$groupHeadline.css({'opacity':1, 'z-index':0});
};

