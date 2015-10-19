function GroupHeaderInnerView() {

}
GroupHeaderInnerView._extends(AbstractView);

GroupHeaderInnerView.prototype.init = function (tag, parent) {
  GroupHeaderInnerView._super.init.call(this, tag, parent);

  this.$header = jQuery('.l-header');

  this.bind(jQuery(window), 'scroll', this.onStageScroll);
};

GroupHeaderInnerView.prototype.onStageScroll = function () {
  var scroll = jQuery(document).scrollTop();
  this.$tag.css({'top':scroll/2});
  if (scroll/2 < this.$header.height()/2) {
    this.$header.css({'top':scroll});
  }
};