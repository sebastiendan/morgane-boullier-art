function TeaTypesView() {
  this.current = null;
}
TeaTypesView._extends(AbstractView);

TeaTypesView.prototype.init = function (tag, parent) {
  TeaTypesView._super.init.call(this, tag, parent);

  this.$nodes = this.$tag.find('.node');
  this.$img = this.$tag.find('.node img');

  var me = this;
  this.$img.each(function(index, element){
    me.bind(jQuery(element), 'click', me.onNodeClick);
  });

  jQuery(this.$img[0]).click();
};

TeaTypesView.prototype.onNodeClick = function (e) {
  this.current = jQuery(e.currentTarget).parents('article.node--tea-type');
  this.current.find('.field--name-title-field').css({'opacity':1});
  this.current.find('.field--name-field-description').css({'opacity':1});
  this.current.addClass('current');

  var me = this;
  this.$nodes.each(function(index, element){
    var $element = jQuery(element);
    if ($element[0] !== me.current[0]) {
      $element.find('.field--name-title-field').css({'opacity':0});
      $element.find('.field--name-field-description').css({'opacity':0});
      $element.removeClass('current');
    }
  });
};