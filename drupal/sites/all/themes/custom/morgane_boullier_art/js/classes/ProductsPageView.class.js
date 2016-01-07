function ProductsPageView() {

}
ProductsPageView._extends(AbstractView);

ProductsPageView.prototype.init = function (tag, parent) {
  ProductsPageView._super.init.call(this, tag, parent);

  this.$categoryButton = this.$tag.find('#choose-category');
  this.bind(this.$categoryButton, 'click', this.onCategoryButtonClick);
};

ProductsPageView.prototype.onCategoryButtonClick = function() {
  this.$categories = this.$tag.find('.view-filters');
  this.$popupBck = jQuery('#popup-bck');
  this.$categoryButton = this.$tag.find('#choose-category');
  this.$categoriesLinks = this.$categories.find('label');

  this.$categories.fadeIn(400);
  this.$popupBck.show();
  this.bind(this.$categoriesLinks, 'click', this.onCategoryClick);
};

ProductsPageView.prototype.onCategoryClick = function() {
  this.$categories.fadeOut(400);
  this.$popupBck.hide();
};