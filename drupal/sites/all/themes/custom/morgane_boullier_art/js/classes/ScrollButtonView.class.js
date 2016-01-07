function ScrollButtonView() {

}
ScrollButtonView._extends(AbstractView);

ScrollButtonView.prototype.init = function (tag, parent) {
  ScrollButtonView._super.init.call(this, tag, parent);

  this.$banner = jQuery('.field--name-field-banner, #block-main-home-scroll-banner, .group-features');
  this.bind(this.$tag, 'click', this.onScrollButtonClick);
};

ScrollButtonView.prototype.onScrollButtonClick = function () {
  var top = this.$banner.offset().top;
  jQuery('body').animate({'scrollTop': top}, 400);
  jQuery('html').animate({'scrollTop': top}, 400);
};