function GroupContentLinksView() {

}
GroupContentLinksView._extends(AbstractView);

GroupContentLinksView.prototype.init = function (tag, parent) {
  GroupContentLinksView._super.init.call(this, tag, parent);

  this.$contentLinks = this.$tag.find('.node');
  this.bind(jQuery(window), 'scroll', this.onStageScroll);
};

GroupContentLinksView.prototype.onStageScroll = function () {
  var contentLinksTop = this.$tag[0].getBoundingClientRect().top;
  if (contentLinksTop !== 0 && contentLinksTop < jQuery(window).height()/2 && !this.isContentLinksAnimEnded) {
    this.$contentLinks.each(function(index, element){
      var $element = jQuery(element);
      var top = $element.css('top').split('px')[0];
      $element.css({'top':top - 50, 'opacity':1});
    });
    this.isContentLinksAnimEnded = true;
  }
};