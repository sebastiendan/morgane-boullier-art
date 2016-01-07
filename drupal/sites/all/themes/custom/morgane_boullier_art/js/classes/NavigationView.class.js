function NavigationView() {

}
NavigationView._extends(AbstractView);

NavigationView.prototype.init = function (tag, parent) {
  NavigationView._super.init.call(this, tag, parent);

  this.$burgerButton = this.$tag.find('#block-main-main-menu-button');
  this.$burgerButtonSvg = this.$burgerButton.find('#main-menu-button');
  this.$menu = this.$tag.find('.menu-name-main-menu');
  this.$line1 = this.$burgerButton.find('#line1');
  this.$line2 = this.$burgerButton.find('#line2');
  this.$line3 = this.$burgerButton.find('#line3');

  this.line1InitPosition = {
    x1: this.$line1[0].getAttribute('x1'),
    y1: this.$line1[0].getAttribute('y1'),
    x2: this.$line1[0].getAttribute('x2'),
    y2: this.$line1[0].getAttribute('y2')
  };

  this.line2InitPosition = {
    x1: this.$line2[0].getAttribute('x1'),
    y1: this.$line2[0].getAttribute('y1'),
    x2: this.$line2[0].getAttribute('x2'),
    y2: this.$line2[0].getAttribute('y2')
  };

  this.line3InitPosition = {
    x1: this.$line3[0].getAttribute('x1'),
    y1: this.$line3[0].getAttribute('y1'),
    x2: this.$line3[0].getAttribute('x2'),
    y2: this.$line3[0].getAttribute('y2')
  };

  this.lineLength = this.$line1[0].getAttribute('x2') - this.$line1[0].getAttribute('x1');
  this.centerX = this.$burgerButtonSvg[0].getBoundingClientRect().width/2;
  this.centerY = this.$burgerButtonSvg[0].getBoundingClientRect().height/2;

  this.bind(this.$burgerButton, 'click', this.onBurgerButtonClick);
};

NavigationView.prototype.onBurgerButtonClick = function () {
  this.$burgerButton.toggleClass('open');
  if (this.$burgerButton.hasClass('open')) {
    this.$menu.addClass('open');
    this.burgerToCross();
  } else {
    this.$menu.removeClass('open');
    this.crossToBurger();
  }
};

NavigationView.prototype.burgerToCross = function () {
  var cos = this.lineLength/2*Math.cos(Math.PI/4);
  var sin = this.lineLength/2*Math.sin(Math.PI/4);
  
  this.$line1.velocity({
    x1: this.centerX - cos,
    y1: this.centerY + sin,
    x2: this.centerX + cos,
    y2: this.centerY - sin
  });

  this.$line2.velocity({
    opacity: 0
  });

  this.$line3.velocity({
    x1: this.centerX - cos,
    y1: this.centerY - sin,
    x2: this.centerX + cos,
    y2: this.centerY + sin
  });
};

NavigationView.prototype.crossToBurger = function () {
  this.$line1.velocity({
    x1: this.line1InitPosition.x1,
    y1: this.line1InitPosition.y1,
    x2: this.line1InitPosition.x2,
    y2: this.line1InitPosition.y2
  });

  this.$line2.velocity({
    opacity: 1
  });

  this.$line3.velocity({
    x1: this.line3InitPosition.x1,
    y1: this.line3InitPosition.y1,
    x2: this.line3InitPosition.x2,
    y2: this.line3InitPosition.y2
  });
};