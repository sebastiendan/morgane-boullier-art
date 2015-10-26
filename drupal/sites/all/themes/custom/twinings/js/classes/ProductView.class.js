function ProductView() {

}
ProductView._extends(AbstractView);

ProductView.prototype.init = function (tag, parent) {
  ProductView._super.init.call(this, tag, parent);

  this.$header = this.$tag.find('.group-header');
  this.$title = this.$header.find('.field--name-title-field');
  this.$features = this.$tag.find('.group-features');
  this.$scrollButton = this.$tag.find('button#scroll-down');
  this.themeColour = this.$tag.attr('data-colour');
  this.themePatternSrc = 'url(' + this.$tag.attr('data-pattern') + ')';

  this.$header.css({'background-color':'#' + this.themeColour});

  var image = this.$features.css('background-image') + ', ' + this.themePatternSrc;
  var position = this.$features.css('background-position') + ', center';
  var repeat = this.$features.css('background-repeat') + ', repeat';
  var size = this.$features.css('background-size') + ', 485px 485px';

  this.$features.css({'background-image': image});
  this.$features.css({'background-repeat': repeat});
  this.$features.css({'background-position': position});
  this.$features.css({'background-size': size});

  this.$scrollButton.css({'background-image':this.themePatternSrc});

  this.bind(jQuery(window), 'scroll', this.onStageScroll);
};

ProductView.prototype.onStageScroll = function() {
  var titleTop = this.$title[0].getBoundingClientRect().top;

  if (titleTop < 0.8*this.$header.height()) {
    this.$title.css({'opacity':0});
  } else {
    this.$title.css({'opacity':1});
  }
};