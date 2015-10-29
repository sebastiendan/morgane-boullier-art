function ContactFormView() {
  this.visibleBannerHeight = 10;
}
ContactFormView._extends(AbstractView);

ContactFormView.prototype.init = function (tag, parent) {
  ContactFormView._super.init.call(this, tag, parent);

  this.$message = this.$tag.find('.messages');

  if (this.$message.length > 0) {
    this.$message.appendTo('#edit-top-block');
  }
};