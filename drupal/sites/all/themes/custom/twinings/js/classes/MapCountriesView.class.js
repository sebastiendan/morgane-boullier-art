function MapCountriesView() {
  this.current = null;
}
MapCountriesView._extends(AbstractView);

MapCountriesView.prototype.init = function (tag, parent) {
  MapCountriesView._super.init.call(this, tag, parent);

  this.$nodes = this.$tag.find('.node');
  this.$titles = this.$tag.find('.node .field--name-title-field');

  var me = this;
  this.$titles.each(function(index, element){
    me.bind(jQuery(element), 'click', me.onNodeClick);
  });

  jQuery(this.$titles[0]).click();
};

MapCountriesView.prototype.onNodeClick = function (e) {
  this.$current = jQuery(e.currentTarget).parents('article.node--map-country');
  this.$current.addClass('current');

  var me = this;
  this.$nodes.each(function(index, element){
    var $element = jQuery(element);
    if ($element[0] !== me.$current[0]) {
      $element.removeClass('current');
    }
  });
};