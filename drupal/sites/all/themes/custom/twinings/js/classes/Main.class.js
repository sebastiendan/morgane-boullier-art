function Main() {
};

Main.prototype.init = function() {
  if (jQuery('.l-region--navigation').length > 0) {
    var navigationView = new NavigationView();
    navigationView.init('.l-region--navigation');
  }

  if (jQuery('body.front').length > 0) {
    var homeView = new HomeView();
    homeView.init('body.front');
  }

  if (jQuery('.group-header-inner').length > 0) {
    var groupHeaderInner = new GroupHeaderInnerView();
    groupHeaderInner.init('.group-header-inner');
  }

  if (jQuery('#scroll-down').length > 0) {
    var scrollButtonView = new ScrollButtonView();
    scrollButtonView.init('#scroll-down');
  }

  if (jQuery('.group-content-links').length > 0) {
    var groupContentLinksView = new GroupContentLinksView();
    groupContentLinksView.init('.group-content-links');
  }

  if (jQuery('.node--content-page.node-teaser').length > 0) {
    jQuery('.node--content-page.node-teaser').each(function(index, element){
      var contentLinkView = new ContentLinkView();
      contentLinkView.init(element);
    });
  }

  if (jQuery('.entity-bullet-popup').length > 0) {
    jQuery('.entity-bullet-popup').each(function(index, element){
      var bulletPopupView = new BulletPopupView();
      bulletPopupView.init(jQuery(element));
    });
  }

  if (jQuery('.node--product.node--full').length > 0) {
    var productView = new ProductView();
    productView.init('.node--product.node--full');
  }

  if (jQuery('#tea-types-wrapper').length > 0) {
    var teaTypesView = new TeaTypesView();
    teaTypesView.init('#tea-types-wrapper');
  }

  if (jQuery('#map-countries-wrapper').length > 0) {
    var mapCountriesView = new MapCountriesView();
    mapCountriesView.init('#map-countries-wrapper');
  }

  //Confection todo
  if (jQuery('body.page-node-8').length > 0) {
    jQuery('#banner-wrapper').after('<div id="todo-wrapper"><img id="todo" src="/sites/all/themes/custom/twinings/images/confection.png"/></div>');
  }

  //Histoire todo
  if (jQuery('body.page-node-10').length > 0) {
    jQuery('#banner-wrapper').after('<div id="todo-wrapper"><img id="todo" src="/sites/all/themes/custom/twinings/images/histoire.png"/></div>');
  }
};