function HomeView() {
  this.visibleBannerHeight = 10;
}
HomeView._extends(AbstractView);

HomeView.prototype.init = function (tag, parent) {
  HomeView._super.init.call(this, tag, parent);

  this.bind(jQuery(window), 'beforeunload', this.onBeforeUnload);

  this.$playButton = this.$tag.find('.video-play-button');
  this.$videoContainer = this.$tag.find('.field--name-field-home-video');
  this.$groupHeadline = this.$tag.find('.group-headline');
  this.$scrollBanner = this.$tag.find('#block-main-home-scroll-banner');
  this.$scrollButton = this.$scrollBanner.find('button#scroll-down');
  this.$groupContentLinks = this.$tag.find('.group-content-links');
  this.$contentLinks = this.$groupContentLinks.find('.node');

  this.bind(this.$scrollButton, 'click', this.onScrollButtonClick);

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
  this.player.on('play', jQuery.proxy(this.onVideoPlay, this));
  this.player.on('pause', jQuery.proxy(this.onVideoPause, this));
  this.player.on('ended', jQuery.proxy(this.onVideoEnd, this));
  this.bind(jQuery(window), 'scroll', this.onStageScroll);
  this.bind(jQuery(window), 'resize', this.onStageResize);

  this.onStageResize();
};

HomeView.prototype.onStageResize = function() {
  var $window = jQuery(window);
  var ww = $window.width();
  var wh = $window.height();

  var scale = Math.max(ww / this.initWidth, (wh - this.usedHeight) / this.initHeight);
  this.player.width(this.initWidth*scale);
  this.player.height(this.initHeight*scale);
  this.$videoContainer.css({'width':ww, 'height':wh - this.usedHeight});

  this.$player.css({'top':(wh - this.usedHeight - this.player.height())/4, 'left':(ww - this.player.width())/2});
  this.$groupHeadline.offset({'top':(wh - this.usedHeight - this.$groupHeadline.height())/1.5});

  this.$scrollBanner.css({'top':wh - this.visibleBannerHeight});
};

HomeView.prototype.onScrollButtonClick = function() {
  var scroll = 2/3*(jQuery(window).height() - this.visibleBannerHeight) + 1;
  jQuery('body').animate({'scrollTop': scroll}, 400);
};

HomeView.prototype.onStageScroll = function() {
  var wh = jQuery(window).height();
  var scroll = jQuery(document).scrollTop();

  this.$scrollBanner.css({'top':wh - this.visibleBannerHeight - scroll});
  this.$groupContentLinks.css({'top':wh - scroll - this.usedHeight + this.$scrollBanner.height()});

  var headlineTop = this.$groupHeadline[0].getBoundingClientRect().top;
  if (headlineTop !== 0 && headlineTop < jQuery(window).height()/3) {
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

  var contentLinksTop = this.$groupContentLinks[0].getBoundingClientRect().top;
  if (contentLinksTop !== 0 && contentLinksTop < jQuery(window).height()/2 && !this.isContentLinksAnimEnded) {
    this.$contentLinks.each(function(index, element){
      var $element = jQuery(element);
      var top = $element.css('top').split('px')[0];
      $element.css({'top':top - 50, 'opacity':1});
    });
    this.isContentLinksAnimEnded = true;
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

