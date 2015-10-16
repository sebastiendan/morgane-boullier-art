function ScrollButtonView() {

}
ScrollButtonView._extends(AbstractView);

ScrollButtonView.prototype.init = function (tag, parent) {
  ScrollButtonView._super.init.call(this, tag, parent);

  this.bind(this.$tag, 'click', this.onScrollButtonClick);
};

ScrollButtonView.prototype.onScrollButtonClick = function () {

};