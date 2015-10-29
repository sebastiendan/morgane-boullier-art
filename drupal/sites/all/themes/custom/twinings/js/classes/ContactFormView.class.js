function ContactFormView() {
  this.visibleBannerHeight = 10;
}
ContactFormView._extends(AbstractView);

ContactFormView.prototype.init = function (tag, parent) {
  ContactFormView._super.init.call(this, tag, parent);

  this.$errors = this.$tag.find('.messages--error');

  if (this.$errors.length > 0) {
    this.$errors.appendTo('#edit-top-block');
  }
};