function ProductView() {

}
ProductView._extends(AbstractView);

ProductView.prototype.init = function (tag, parent) {
  ProductView._super.init.call(this, tag, parent);

  this.$header = this.$tag.find('.group-header');
  this.$banner = this.$tag.find('.field--name-field-banner');
  this.$scrollButton = this.$tag.find('button#scroll-down');
  this.themeColour = this.$tag.attr('data-colour');
  this.themePatternSrc = 'url(' + this.$tag.attr('data-pattern') + ')';

  this.$header.css({'background-color':'#' + this.themeColour});

  var image = this.$tag.find('.field--name-field-banner').css('background-image') + ', ' + this.themePatternSrc;
  var position = this.$tag.find('.field--name-field-banner').css('background-position') + ', center';
  var repeat = this.$tag.find('.field--name-field-banner').css('background-repeat') + ', repeat';
  var size = this.$tag.find('.field--name-field-banner').css('background-size') + ', 485px 485px';

  this.$banner.css({'background-image': image});
  this.$banner.css({'background-repeat': repeat});
  this.$banner.css({'background-position': position});
  this.$banner.css({'background-size': size});

  this.$scrollButton.css({'background-image':this.themePatternSrc});
};