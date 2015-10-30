function MapCountriesMobileView() {
  this.current = null;
}
MapCountriesMobileView._extends(AbstractView);

MapCountriesMobileView.prototype.init = function (tag, parent) {
  MapCountriesMobileView._super.init.call(this, tag, parent);

  this.$nodes = this.$tag.find('.node');
  this.$titles = this.$tag.find('.node .field--name-title-field');
  
  this.$tag.find('#map-countries').before('<div id="title-wrapper"></div>');
  this.$titles.appendTo(this.$tag.find('#title-wrapper'));
  this.mobileElements = '.group-map-popup, #popup-title, .field--name-field-text';

  var me = this;
  this.$titles.each(function(index, element){
    me.bind(jQuery(element), 'click', me.onNodeClick);
  });


  jQuery(this.$titles[0]).click();
};

MapCountriesMobileView.prototype.onNodeClick = function (e) {
  this.currentIndex = this.getCurrent(e);

  this.$currentNode = jQuery(this.$nodes[this.currentIndex]);
  this.$currentTitle = jQuery(this.$titles[this.currentIndex]);

  this.$currentNode.addClass('current');
  this.$currentTitle.addClass('current');

  var me = this;
  setTimeout(function(){
    me.$currentNode.find(me.mobileElements).fadeIn(400);
  }, 400);

  var me = this;
  this.$nodes.each(function(index, element){
    var $element = jQuery(element);
    if ($element[0] !== me.$currentNode[0]) {
      $element.removeClass('current');
      $element.find(me.mobileElements).fadeOut(400);
    }
  });

  this.$titles.each(function(index, element){
    var $element = jQuery(element);
    if ($element[0] !== me.$currentTitle[0]) {
      $element.removeClass('current');
    }
  });
};

MapCountriesMobileView.prototype.getCurrent = function (e) {
  for (var i= 0, len = this.$titles.length;i<len;i++) {
    if (jQuery(this.$titles[i])[0] == jQuery(e.currentTarget)[0]) {
      return i;
    }
  }
};