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
  this.show(this.current);
  this.current.addClass('current');

  var me = this;
  this.$nodes.each(function(index, element){
    var $element = jQuery(element);
    if ($element[0] !== me.current[0]) {
      me.hide($element);
      $element.removeClass('current');
    }
  });
};

TeaTypesView.prototype.show = function ($element) {
  if (Main.isMobile()) {
    $element.find('.field--name-title-field').fadeIn(400);
    $element.find('.field--name-field-description').fadeIn(400);
  } else {
    $element.find('.field--name-title-field').css({'opacity':1});
    $element.find('.field--name-field-description').css({'opacity':1});
  }
};

TeaTypesView.prototype.hide = function ($element) {
  if (Main.isMobile()) {
    $element.find('.field--name-title-field').fadeOut(400);
    $element.find('.field--name-field-description').fadeOut(400);
  } else {
    $element.find('.field--name-title-field').css({'opacity':0});
    $element.find('.field--name-field-description').css({'opacity':0});
  }
};