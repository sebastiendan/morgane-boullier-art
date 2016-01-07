function InformationBoardView() {

}
InformationBoardView._extends(AbstractView);

InformationBoardView.prototype.init = function (tag, parent) {
  InformationBoardView._super.init.call(this, tag, parent);

  this.bind(jQuery(window), 'load', this.onWindowLoad);
};

InformationBoardView.prototype.onWindowLoad = function() {
  this.height = this.$tag.find('.field--name-title-field .field__item').height() + 20;
  this.$tag.find('.field--name-title-field').height(this.height);
  //this.$tag.find('.form-wrapper.collapsible').height(this.height);
  this.$tag.find('.form-wrapper.collapsible legend').height(this.height);
  this.$tag.find('.form-wrapper.collapsible legend span').height(this.height);
  this.$tag.find('.form-wrapper.collapsible legend span a').height(this.height);
};