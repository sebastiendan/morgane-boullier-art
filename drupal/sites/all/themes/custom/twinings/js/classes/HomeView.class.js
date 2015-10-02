function HomeView() {

}
HomeView._extends(AbstractView);

HomeView.prototype.init = function (tag, parent) {
  HomeView._super.init.call(this, tag, parent);

  this.$playButton = this.$tag.find('.video-play-button');
  this.$headline = this.$tag.find('.group-headline');

  this.usedHeight = jQuery('.l-page').children('header').height() + 10; // header height + height of scroll banner that is visible
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
  this.bind(jQuery(window), 'resize', this.onStageResize);

  this.onStageResize();
};

HomeView.prototype.onStageResize = function() {
  var scale = Math.max(jQuery(window).width() / this.initWidth, (jQuery(window).height() - this.usedHeight) / this.initHeight);
  this.player.width(this.initWidth*scale);
  this.player.height(this.initHeight*scale);
  this.$player.css({'top':(jQuery(window).height() - this.usedHeight - this.player.height())/2, 'left':(jQuery(window).width() - this.player.width())/2});
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