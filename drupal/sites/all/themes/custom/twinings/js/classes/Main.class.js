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
};