function Main() {
};

Main.prototype.init = function() {
  jQuery('html').css({'opacity':1});

  if (Main.isMobile() || Main.isTablet()) {
    jQuery('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">');
  }

  if(0 < jQuery('#block-main-prehome-cup').length && !Main.isMobile()){
    if(location.search != '?video'){
      var prehomeCupView = new PrehomeCupView();
      prehomeCupView.init('#block-main-prehome-cup');
    }else{
      jQuery('#block-main-prehome-cup').remove();
    }
  }

  if (jQuery('.l-region--navigation').length > 0) {
    var navigationView = new NavigationView();
    navigationView.init('.l-region--navigation');
  }

  if (jQuery('body.front').length > 0) {
    var homeView = new HomeView();
    homeView.init('body.front');
  }

  if (jQuery('.group-header-inner').length > 0 && !Main.isMobile()) {
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

  if (jQuery('.node--content-page.node-teaser').length > 0 || jQuery('.node--products-page.node-teaser').length > 0) {
    jQuery('.node--content-page.node-teaser, .node--products-page.node-teaser').each(function(index, element){
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

  if (jQuery('.entity-information-board').length > 0 && Main.isMobile()) {
    jQuery('.entity-information-board').each(function(index, element){
      var informationBoardView = new InformationBoardView();
      informationBoardView.init(jQuery(element));
    });
  }

  if (jQuery('.node--product.node--full').length > 0) {
    var productView = new ProductView();
    productView.init('.node--product.node--full');
  }

  if (jQuery('.node--products-page.node--full').length > 0) {
    var productsPageView = new ProductsPageView();
    productsPageView.init('.node--products-page.node--full');
  }

  if (jQuery('.page-node-15').length > 0 && !Main.isMobile()) {
    var contactFormView = new ContactFormView();
    contactFormView.init('.page-node-15');
  }

  if (jQuery('#tea-types-wrapper').length > 0) {
    var teaTypesView = new TeaTypesView();
    teaTypesView.init('#tea-types-wrapper');
  }

  if (jQuery('#map-countries-wrapper').length > 0) {
    if (Main.isMobile() || Main.isTablet()) {
      var mapCountriesView = new MapCountriesMobileView();
      mapCountriesView.init('#map-countries-wrapper');
    } else {
      var mapCountriesView = new MapCountriesView();
      mapCountriesView.init('#map-countries-wrapper');
    }
  }

  //Histoire todo
  if (jQuery('body.page-node-10').length > 0) {
    if (Main.isMobile()) {
      jQuery('#banner-wrapper').after('<div id="todo-wrapper"><img id="todo" src="/sites/all/themes/custom/morgane_boullier_art/images/histoire_mobile.png"/></div>');
    } else {
      jQuery('#banner-wrapper').after('<div id="todo-wrapper"><img id="todo" src="/sites/all/themes/custom/morgane_boullier_art/images/histoire.png"/></div>');
    }
  }

  var $body = jQuery('body');
  jQuery('#popup-bck').css({'width':$body.width(), 'height':$body.height()});

};

Main.isMobile = function() {
  return (screen.width <= 640 || jQuery(window).width() <= 640);
};

Main.isTablet = function() {
  return ((640 <= screen.width || 640 <= jQuery(window).width()) && (screen.width <= 1024 || jQuery(window).width() <= 1024));
};