function GroupHeaderInnerView() {

}
GroupHeaderInnerView._extends(AbstractView);

GroupHeaderInnerView.prototype.init = function (tag, parent) {
  GroupHeaderInnerView._super.init.call(this, tag, parent);

  this.$header = jQuery('.l-header');
  this.int = setInterval(jQuery.proxy(this.getCookiesBar, this), 100);

  this.bind(jQuery(window), 'scroll', this.onStageScroll);
};

GroupHeaderInnerView.prototype.onStageScroll = function () {
  var scroll = jQuery(document).scrollTop()/2;
  this.$tag.css({'top':scroll/2});
};

GroupHeaderInnerView.prototype.getCookiesBar = function () {
  this.$cookies = jQuery('#sliding-popup');

  if (this.$cookies.length > 0) {
    clearInterval(this.int);
    this.$cookies.css({'top':'0 !important'});
    this.$cookies.fadeIn(400);
    this.onStageScroll();

    this.bind(this.$cookies.find('.agree-button'), 'click', this.onCloseButtonClick);
  }
};

GroupHeaderInnerView.prototype.onCloseButtonClick = function () {
  this.$cookies.hide();
};