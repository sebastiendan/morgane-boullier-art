function Main() {
};

Main.prototype.init = function() {
  if (jQuery('body.front').length > 0) {
    var homeView = new HomeView();
    homeView.init('body.front');
  }
};